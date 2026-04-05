---
title: VSCode + MSYS2 + Clang + Clangd + Xmake 配置优雅的 Windows C++ 开发环境
slug: cpp-dev-env-in-vscode-on-windows
category: 经验记录
tags:
  - VSCode
  - C++
  - Windows
cover: https://images.hpcesia.com/671f2ba9796b5.webp
published: 2024-10-13T15:21:27+08:00
description: 使用 VSCode + MSYS2 + Clang + Clangd + Xmake 搭建优雅的 Windows C++ 开发环境。
---

## 准备工作

由于我们最终是要使用 VSCode 而非 Visual Studio 进行 C++ 开发，因此本节 Clang 的安装将使用 MSYS2 + mingw-w64 进行。

### 安装 MSYS2

在 [GitHub Release](https://github.com/msys2/msys2-installer/releases) 上下载最新版的 MSYS2 安装包。如果访问 GitHub 有困难，也可以使用[清华镜像源](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/)进行下载。

下载后打开安装程序，选择一个合适的路径，然后一路点 next 即可安装完成。

打开 Windows Terminal，在设置中选择打开 JSON 文件，然后将下列配置添加到打开的 JSON 文件中，注意更换 MSYS2 路径为自己的安装路径：

```json
"profiles": {
  "list":
  [
    // ...
    {
      "guid": "{17da3cac-b318-431e-8a3e-7fcdefe6d114}",
      "name": "Clang64 / MSYS2",
      "commandline": "C:/msys64/msys2_shell.cmd -defterm -here -no-start -clang64",
      "startingDirectory": "C:/msys64/home/%USERNAME%",
      "icon": "C:/msys64/Clang64.ico",
    },
    {
      "guid": "{71160544-14d8-4194-af25-d05feeac7233}",
      "name": "MSYS / MSYS2",
      "commandline": "C:/msys64/msys2_shell.cmd -defterm -here -no-start -msys",
      "startingDirectory": "C:/msys64/home/%USERNAME%",
      "icon": "C:/msys64/msys2.ico",
    },
    // ...
  ]
}
```

接着在 Windows Terminal 中打开刚刚设置的 Clang64 / MSYS2 界面，在终端中输入

```bash
sed -i "s#https\?://mirror.msys2.org/#https://mirrors.tuna.tsinghua.edu.cn/msys2/#g" /etc/pacman.d/mirrorlist*
```

将 MSYS2 的包仓库更换为清华镜像源，然后输入

```bash
pacman -Syu
```

更新系统。

### 安装 Clang 工具链

> [!WARNING]
> clang 应当安装在 clang64 环境下，否则会导致 clangd 识别头文件出错

在 Clang64 / MSYS2 命令行中输入

```bash
pacman -S mingw-w64-clang-x86_64-toolchain
```

即可安装 clang 工具链。

### 安装 Xmake

- **Windows 安装包**

  在 [Release](https://github.com/xmake-io/xmake/releases) 上下载最新版的 xmake-master.win64.exe，安装即可。

- **winget**

  在终端输入

  ```bash
  winget install xmake
  ```

  即可安装 Xmake。

- **msys2**

  在 Clang64 / MSYS2 命令行中输入

  ```bash
  pacman -Sy mingw-w64-x86_64-xmake
  ```

  即可安装 Xmake。

### 安装 VSCode 插件

在 VSCode 的扩展选项卡搜索 Clangd、CodeLLDB、Xmake 并安装。

CodeLLDB 的安装过程中会下载一个文件，国内网络大概率下载失败，可以点击弹出消息的手动下载按钮，然后再从 VSIX 安装下载的包。

## 配置

### VSCode 配置

在 VSCode 的 setting.json 中添加如下内容：

```json
// settings.json
// Xmake
"xmake.debugConfigType": "codelldb", // 使用 codelldb 插件而非 cpptools 进行调试
"xmake.runMode": "buildRun", // 运行前自动 build
"xmake.buildLevel": "verbose", // 设置编译时输出信息级别,默认是warnings级别,仅输出编译警告信息以及正常信息,verbose级别输出完整的编译命令行参数,debug级别对应 xmake -vD 的诊断信息，会打印出错的栈信息
"xmake.customDebugConfig": {
    "console": "integratedTerminal" // XMake调试时使用集成终端而非 debug console,也可以使用 externalTerminal
},
// Clangd
"clangd.path": "C:/msys64/clang64/bin/clangd.exe", // Clangd 文件位置
"clangd.arguments": [
  "--all-scopes-completion", // 全局补全(补全建议会给出在当前作用域不可见的索引,插入后自动补充作用域标识符),例如在main()中直接写cout,即使没有`#include <iostream>`,也会给出`std::cout`的建议,配合"--header-insertion=iwyu",还可自动插入缺失的头文件
  "--background-index", // 后台分析并保存索引文件
  "--clang-tidy", // 启用 Clang-Tidy 以提供「静态检查」
  "--clang-tidy-checks=performance-*, bugprone-*, misc-*, google-*, modernize-*, readability-*, portability-*",
  "--compile-commands-dir=${workspaceFolder}/.vscode", // 编译数据库(compile_commands.json 文件)的目录位置
  "--completion-parse=auto", // 当 clangd 准备就绪时，用它来分析建议
  "--completion-style=detailed", // 建议风格：打包(重载函数只会给出一个建议);还可以设置为 detailed
  "--enable-config", // 启用配置文件(YAML格式)
  "--fallback-style=LLVM", // 默认格式化风格: 在没找到 .clang-format 文件时采用,可用的有 LLVM, Google, Chromium, Mozilla, Webkit, Microsoft, GNU
  "--function-arg-placeholders=true", // 补全函数时，将会给参数提供占位符，键入后按 Tab 可以切换到下一占位符，乃至函数末
  "--header-insertion-decorators", // 输入建议中，已包含头文件的项与还未包含头文件的项会以圆点加以区分
  "--header-insertion=never", // 插入建议时不自动引入头文件
  "--log=verbose", // 让 Clangd 生成更详细的日志
  "--pch-storage=memory", // pch 优化的位置(Memory 或 Disk,前者会增加内存开销，但会提升性能)
  "--pretty", // 输出的 JSON 文件更美观
  "--ranking-model=decision_forest", // 建议的排序方案：hueristics (启发式), decision_forest (决策树)
  "-j=12", // 同时开启的任务数量
  "--query-driver=C:/msys64/clang64/bin/clang*" // clang 编译器的路径（设置错误会导致 clangd 无法识别标准库）
],
"clangd.checkUpdates": true, // 自动检测 clangd 更新
"clangd.onConfigChanged": "restart", // 借助网上的信息排序建议
"clangd.detectExtensionConflicts": true, // 当其它拓展与 clangd 冲突时警告并建议禁用
"editor.suggest.snippetsPreventQuickSuggestions": false, // clangd的snippets有很多的跳转点，不用这个就必须手动触发Intellisense了
// LLDB
"lldb.commandCompletions": true, // LLDB 指令自动补全
"lldb.dereferencePointers": true, // LLDB 指针显示解引用内容
"lldb.evaluateForHovers": true, // LLDB 鼠标悬停在变量上时预览变量值
"lldb.launch.expressions": "native", // LLDB 监视表达式的默认类型
"lldb.showDisassembly": "never", // LLDB 不显示汇编代码
"lldb.verboseLogging": true,
```

接下来，就可以创建一个空文件夹，作为自己的一个 C++ 测试项目了。

### 项目配置文件

在项目根目录下新建 `.clangd`、`.clang-tidy` 和 `.clang-format` 三个文件，分别填入如下内容：

- `.clangd` 文件：
  文件中 `readability-identifier-naming` 部分请参阅[官方文档](https://clang.llvm.org/extra/clang-tidy/checks/readability/identifier-naming.html)进行个性化修改。

```yaml
# .clangd
Diagnostics:
  ClangTidy:
    Add: [readability-identifier*]
    CheckOptions:
      # 变量命名规则
      # 详细请参考官方文档 https://clang.llvm.org/extra/clang-tidy/checks/readability/identifier-naming.html
      readability-identifier-naming.VariableCase: lower_case
      readability-identifier-naming.GlobalVariableCase: lower_case
      readability-identifier-naming.GlobalVariablePrefix: g_

      readability-identifier-naming.MemberPrefix: m_
      readability-identifier-naming.MemberCase: lower_case
      readability-identifier-naming.ClassMemberPrefix: m_
      readability-identifier-naming.ClassMemberCase: lower_case

      readability-identifier-naming.EnumCase: UPPER_CASE
      readability-identifier-naming.EnumConstantCase: UPPER_CASE
      readability-identifier-naming.MacroDefinitionCase: UPPER_CASE

      readability-identifier-naming.ClassCase: CamelCase
      readability-identifier-naming.StructCase: Camelcase

      readability-identifier-naming.FunctionCase: camelCase
      readability-identifier-naming.ClassMethodCase: camelCase
      readability-identifier-naming.MethodCase: camelCase

      readability-identifier-naming.ConstantCase: UPPER_CASE
      readability-identifier-naming.ConstantParameterCase: camel_Snake_Back

CompileFlags:
  Add:
    - '-pedantic'
    - '-Wall'
    - '-Wextra'
    - '-Wcast-align'
    - '-Wdouble-promotion'
    - '-Wformat=2'
    - '-Wimplicit-fallthrough'
    - '-Wmisleading-indentation'
    - '-Wnon-virtual-dtor'
    - '-Wnull-dereference'
    - '-Wold-style-cast'
    - '-Woverloaded-virtual'
    - '-Wpedantic'
    - '-Wshadow'
    - '-Wunused'
    - '-pthread'
    - '-fuse-ld=lld'
    - '-fsanitize=address'
    - '-fsanitize=undefined'
    - '-stdlib=libc++'
    - '-std=c++20' # 根据实际需要填写
```

- `.clang-tidy` 文件：

```yaml
# .clangd-tidy
---
Checks: "bugprone-*,\
  google-*,\
  misc-*,\
  modernize-*,\
  performance-*,\
  readability-*,\
  portability-*,\
  "
HeaderFilterRegex: 'Source/cm[^/]*\.(h|hxx|cxx)$'
CheckOptions:
  - key: modernize-use-default-member-init.UseAssignment
    value: '1'
  - key: modernize-use-equals-default.IgnoreMacros
    value: '0'
  - key: modernize-use-auto.MinTypeNameLength
    value: '80'
```

- `.clang-format` 文件：
  可以取消 `BasedOnStyle` 项的注释，然后只保留少数自定义修改。

```yaml
# .clang-format
---
## 语言: None, Cpp, Java, JavaScript, ObjC, Proto, TableGen, TextProto
Language: Cpp
## 基础风格
## BasedOnStyle:  LLVM
## 访问说明符(public、private等)的偏移
AccessModifierOffset: -4
## 开括号(开圆括号、开尖括号、开方括号)后的对齐: Align, DontAlign, AlwaysBreak(总是在开括号后换行)
AlignAfterOpenBracket: Align
## 对齐数组列
AlignArrayOfStructures: None
## 对齐连续宏定义
AlignConsecutiveMacros: None
## 连续赋值时，对齐所有等号
AlignConsecutiveAssignments: None
## 对齐连续位字段
AlignConsecutiveBitFields: None
## 连续声明时，对齐所有声明的变量名
AlignConsecutiveDeclarations: None
## 左对齐逃脱换行(使用反斜杠换行)的反斜杠
AlignEscapedNewlines: Left
## 水平对齐二元和三元表达式的操作数
AlignOperands: Align
## 对齐连续的尾随的注释
AlignTrailingComments: true
## 允许函数声明的所有参数在放在下一行
AllowAllParametersOfDeclarationOnNextLine: true
## 允许短的枚举放在同一行
AllowShortEnumsOnASingleLine: true
## 允许短的块放在同一行
AllowShortBlocksOnASingleLine: Never
## 允许短的case标签放在同一行
AllowShortCaseLabelsOnASingleLine: false
## 允许短的函数放在同一行
AllowShortFunctionsOnASingleLine: All
## 允许短的匿名函数放在同一行
AllowShortLambdasOnASingleLine: All
## 允许短的if语句保持在同一行
AllowShortIfStatementsOnASingleLine: Never
## 允许短的循环保持在同一行
AllowShortLoopsOnASingleLine: false
## 总是在返回类型后换行
AlwaysBreakAfterReturnType: None
## 总是在多行string字面量前换行
AlwaysBreakBeforeMultilineStrings: false
## 总是在template声明后换行
AlwaysBreakTemplateDeclarations: MultiLine
AttributeMacros:
  - __capability
## false表示函数实参要么都在同一行，要么都各自一行
BinPackArguments: true
## false表示所有形参要么都在同一行，要么都各自一行
BinPackParameters: true
## 大括号换行，只有当BreakBeforeBraces设置为Custom时才有效
BraceWrapping:
  AfterCaseLabel: false
  AfterClass: false
  AfterControlStatement: Never
  AfterEnum: false
  AfterFunction: false
  AfterNamespace: false
  AfterObjCDeclaration: false
  AfterStruct: false
  AfterUnion: false
  AfterExternBlock: false
  BeforeCatch: false
  BeforeElse: false
  BeforeLambdaBody: false
  BeforeWhile: false
  IndentBraces: false
  SplitEmptyFunction: true
  SplitEmptyRecord: true
  SplitEmptyNamespace: true
## 在二元运算符前换行
BreakBeforeBinaryOperators: None
## 在concept前换行
BreakBeforeConceptDeclarations: true
## 在大括号前换行: Attach(始终将大括号附加到周围的上下文)
BreakBeforeBraces: Attach
## 继承列表样式
BreakInheritanceList: AfterComma
## 在三元运算符前换行
BreakBeforeTernaryOperators: true
## 构造函数初始值设定项换行样式
BreakConstructorInitializers: BeforeComma
## 在java字段的注释后换行
BreakAfterJavaFieldAnnotations: false
## 每行字符的限制，0表示没有限制
ColumnLimit: 96
## 描述具有特殊意义的注释的正则表达式，它不应该被分割为多行或以其它方式改变
CommentPragmas: '^ IWYU pragma:'
## 在新行上声明每个命名空间
CompactNamespaces: false
## 构造函数的初始化列表的缩进宽度
ConstructorInitializerIndentWidth: 4
## 延续的行的缩进宽度
ContinuationIndentWidth: 4
## 去除C++11的列表初始化的大括号{后和}前的空格
Cpp11BracedListStyle: true
## 继承最常用的换行方式
DeriveLineEnding: true
## 继承最常用的指针和引用的对齐方式
DerivePointerAlignment: false
## 关闭格式化
DisableFormat: false
## 删除访问修饰符后的所有空行
EmptyLineAfterAccessModifier: Never
## 仅当访问修饰符开始一个新的逻辑块时才添加空行
EmptyLineBeforeAccessModifier: LogicalBlock
## 自动检测函数的调用和定义是否被格式为每行一个参数(Experimental)
ExperimentalAutoDetectBinPacking: false
## 自动补充namespace注释
FixNamespaceComments: true
## 需要被解读为foreach循环而不是函数调用的宏
ForEachMacros:
  - foreach
  - Q_FOREACH
  - BOOST_FOREACH
IfMacros:
  - KJ_IF_MAYBE
## 多个#include块合并在一起并排序为一个
IncludeBlocks: Merge
## 可以定义负数优先级从而保证某些#include永远在最前面
IncludeCategories:
  - Regex: '^"(llvm|llvm-c|clang|clang-c)/'
    Priority: 2
    SortPriority: 0
    CaseSensitive: false
  - Regex: '^(<|"(gtest|gmock|isl|json)/)'
    Priority: 3
    SortPriority: 0
    CaseSensitive: false
  - Regex: '.*'
    Priority: 1
    SortPriority: 0
    CaseSensitive: false
IncludeIsMainRegex: '(Test)?$'
IncludeIsMainSourceRegex: ''
## 缩进访问修饰符
IndentAccessModifiers: false
## 缩进case标签
IndentCaseLabels: false
## case 标签后面的块使用与 case 标签相同的缩进级别
IndentCaseBlocks: false
## 缩进goto标签。
IndentGotoLabels: false
## 缩进预处理器指令
IndentPPDirectives: None
## 向后兼容缩进外部块
IndentExternBlock: AfterExternBlock
## 缩进模板中的requires子句
IndentRequires: false
## 缩进宽度
IndentWidth: 4
## 函数返回类型换行时，缩进函数声明或函数定义的函数名
IndentWrappedFunctionNames: false
## 插入尾随逗号
InsertTrailingCommas: None
## 保留JavaScript字符串引号
JavaScriptQuotes: Leave
## 包装 JavaScript 导入/导出语句
JavaScriptWrapImports: true
## 保留在块开始处的空行
KeepEmptyLinesAtTheStartOfBlocks: true
## 相对于 lambda 签名对齐 lambda 主体
LambdaBodyIndentation: Signature
## 开始一个块的宏的正则表达式
MacroBlockBegin: ''
## 结束一个块的宏的正则表达式
MacroBlockEnd: ''
## 连续空行的最大数量
MaxEmptyLinesToKeep: 1
## 命名空间的缩进
NamespaceIndentation: Inner
ObjCBinPackProtocolList: Auto
## 使用ObjC块时缩进宽度
ObjCBlockIndentWidth: 4
ObjCBreakBeforeNestedBlockParam: true
## 在ObjC的@property后添加一个空格
ObjCSpaceAfterProperty: false
## 在ObjC的protocol列表前添加一个空格
ObjCSpaceBeforeProtocolList: true
PenaltyBreakAssignment: 2
PenaltyBreakBeforeFirstCallParameter: 19
PenaltyBreakComment: 300
PenaltyBreakFirstLessLess: 120
PenaltyBreakString: 1000
PenaltyBreakTemplateDeclaration: 10
PenaltyExcessCharacter: 1000000
PenaltyReturnTypeOnItsOwnLine: 60
PenaltyIndentedWhitespace: 0
## 指针的对齐: Left, Right, Middle
PointerAlignment: Left
## 缩进预处理器语句的列数
PPIndentWidth: -1
## 引用的对齐
ReferenceAlignment: Pointer
## 允许重新排版注释
ReflowComments: true
## 短命名空间跨越的最大展开行数
ShortNamespaceLines: 1
## 允许排序#include
SortIncludes: false
## java静态导入放在非静态导入之前
SortJavaStaticImport: Before
## 对using声明排序
SortUsingDeclarations: true
## 在C风格类型转换后添加空格
SpaceAfterCStyleCast: false
## 在!后添加空格
SpaceAfterLogicalNot: false
## 在Template关键字后添加空格
SpaceAfterTemplateKeyword: true
## 在赋值运算符之前添加空格
SpaceBeforeAssignmentOperators: true
## 不在case冒号之前添加空格
SpaceBeforeCaseColon: false
## 不在C++11大括号列表之前添加空格
SpaceBeforeCpp11BracedList: false
## 在构造函数初始化器冒号之前添加空格
SpaceBeforeCtorInitializerColon: true
## 在继承冒号前添加空格
SpaceBeforeInheritanceColon: true
## 开圆括号之前添加一个空格: Never, ControlStatements, Always
SpaceBeforeParens: ControlStatements
## 不要确保指针限定符周围有空格，而是使用 PointerAlignment
SpaceAroundPointerQualifiers: Default
## 在基于范围的for循环冒号之前添加空格
SpaceBeforeRangeBasedForLoopColon: true
## {}中间不添加空格
SpaceInEmptyBlock: false
## 在空的圆括号中添加空格
SpaceInEmptyParentheses: false
## 在尾随的评论前添加的空格数(只适用于//)
SpacesBeforeTrailingComments: 1
## 在尖括号的<后和>前添加空格
SpacesInAngles: Never
## 不在if/for/switch/while条件周围插入空格
SpacesInConditionalStatement: false
## 在容器(ObjC和JavaScript的数组和字典等)字面量中添加空格
SpacesInContainerLiterals: true
## 在C风格类型转换的括号中添加空格
SpacesInCStyleCastParentheses: false
## 行注释开头允许有多少个空格。要禁用最大值，请将其设置为-1，除此之外，最大值优先于最小值
SpacesInLineCommentPrefix:
  Minimum: 1
  Maximum: -1
## 在圆括号的(后和)前添加空格
SpacesInParentheses: false
## 在方括号的[后和]前添加空格，lamda表达式和未指明大小的数组的声明不受影响
SpacesInSquareBrackets: false
## 不在[前添加空格
SpaceBeforeSquareBrackets: false
## 位域:每边都添加空格
BitFieldColonSpacing: Both
## 标准
Standard: Auto
## 在语句前面被忽略的宏定义，就好像它们是一个属性一样
StatementAttributeLikeMacros:
  - Q_EMIT
## 应该被解释为完整语句的宏定义
StatementMacros:
  - Q_UNUSED
  - QT_REQUIRE_VERSION
## tab宽度
TabWidth: 4
## 使用\n换行
UseCRLF: false
## 使用tab字符：ForIndentation——仅将制表符用于缩进
UseTab: Never
## 对空格敏感的宏定义
WhitespaceSensitiveMacros:
  - STRINGIZE
  - PP_STRINGIZE
  - BOOST_PP_STRINGIZE
  - NS_SWIFT_NAME
  - CF_SWIFT_NAME
```

### Xmake 配置

首先新建一个 `hello_world.cpp` 文件，然后在其中输入一个基础的 Hello world 程序：

```cpp
// hello_world.cpp
#include <iostream>

int main() {
    std::cout << "Hello, world!" << std::endl;
    return 0;
}
```

然后在项目根目录下新建 `xmake.lua` 文件，这会激活 Xmake 扩展。在文件中输入：

```lua
-- xmake.lua
add_defines("ROOT")
add_rules("mode.debug", "mode.release")
set_toolchains("clang")
set_languages("cxx17","c11")
set_optimize("fastest")
set_warnings("all")

-- 添加工程
target("Hello world!")
    set_kind("binary")
    add_files("hello_world.cpp")
target_end()
```

此时 VSCode 的底栏会出现 Xmake 的一系列选项，直接点击下方的 ▶️ 按钮，Xmake 就会调用 Clang 编译刚刚新建的 hello world 程序了。

至此，一个优雅好用的 C++ 开发环境就算搭建完成了。更多相关配置请参考 [Xmake 文档](https://xmake.io/#/zh-cn/about/introduction)。

## 参考资料

本文的编写参考了下列文章：

- [[万字长文]Visual Studio Code 配置 C/C++ 开发环境的最佳实践(VSCode + Clangd + XMake) - 知乎](https://zhuanlan.zhihu.com/p/398790625)
- [几乎无痛的VSCode+clangd+lldb+cmake配置C/C++开发环境指南 - 知乎](https://zhuanlan.zhihu.com/p/566365173)
- [使用 VSCode + XMake + LLVM 开发现代 C++！（llvm-mingw + clangd + modules）](https://quadnucyard.github.io/posts/cpp/clang-std-modules.html)
- [MSYS2 与 CMake 编程综合指引 | 惰性磷的博客](https://lazy-phosphorus.com/post/msys2-cmake-guide/)
