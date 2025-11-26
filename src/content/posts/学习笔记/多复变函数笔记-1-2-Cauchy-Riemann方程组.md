---
title: 多复变函数论学习笔记 - 第一章 全纯函数 - 第二节 Cauchy-Riemann 方程组
slug: notes-on-theory-of-several-complex-variables-1-2
category: 学习笔记
tags:
  - 数学
cover: https://images.hpcesia.com/671f2b6593df1.webp
published: 2024-09-27T23:04:16+08:00
description: 多复变函数论学习笔记 - 复欧氏空间上的 Cauchy-Riemann 方程组
---

## 多重指标记号

定义如下**多重指标记号**：

- 设 $\alpha = \left( \alpha_{1},\cdots,\alpha_{n} \right) \in {\mathbb{N}}^{n}$，$x = \left( x_{1},\cdots,x_{n} \right) \in {\mathbb{R}}^{n}$，记

$$
|\alpha| = \sum_{j = 1}^{n}\alpha_{j},\quad\alpha! = \prod_{j = 1}^{n}\alpha_{j}!,\quad x^{\alpha} = \prod_{j = 1}^{n}{x_{j}^{\alpha_{j}}}.
$$

- 记 $\alpha \geq 0$ 为 $\forall 1 \leq j \leq n$，$\alpha_{j} \geq 0$。

- 记

  $$
  D^{\alpha} ≔ \frac{\partial^{|\alpha|}}{\partial x_{1}^{\alpha_{1}}\cdots\partial x_{n}^{\alpha_{n}}}.
  $$

## 复值连续可微空间

对开集 $D \subset {\mathbb{R}}^{n}$ 与 $k \in {\mathbb{N}} \cup \left\{ + \infty \right\}$，$C^{k}(D)$ 表示在 $D$ 内 $k$ 次连续可微的的复值函数全体，并记 $C(D) = C^{0}(D)$。

设 $f \in C^{k}(D)$，$k < + \infty$，定义 $f$ 在 $D$ 上的 $C^{k}$ 范数为

$$
\left\| f \right\|_{k,D} = \sum_{\begin{array}{r}

\alpha \in {\mathbb{N}}^{n} \\

|\alpha| \leq k

\end{array}}\sup\limits_{x \in D}\left| {D^{\alpha}f(x)} \right|.
$$

记 $\left\| f \right\|_{D} ≔ \left\| f \right\|_{0,D}$，$\left\| f \right\|_{k} ≔ \left\| f \right\|_{k,D}$，空间

$$
B^{k}(D) = \left\{ f \in C^{k}(D):\left\| f \right\|_{k} < \infty \right\}
$$

关于 $C^{k}$ 范数 $\left\| \cdot \right\|_{k}$ 是**完备的**，即 $B^{k}(D)$ 为 **Banach 空间**。

类似地，空间

$$
C^{k}\left( \overline{D} \right) = \left\{ f \in C^{k}(D):D^{\alpha}f\text{ 可连续延拓到 }\overline{D},\forall\alpha \in {\mathbb{N}}^{n},|\alpha| \leq k \right\}
$$

关于范数 $\left\| \cdot \right\|_{k,D}$ 也为 Banach 空间。

## 偏微分算子

视 ${\mathbb{C}}^{n} = {\mathbb{R}}^{2n}$，由 $z_{j} = x_{j} + ix_{j + n}$，可引入偏微分算子

$$
\frac{\partial}{\partial z_{j}} = \frac{1}{2}\left( \frac{\partial}{\partial x_{j}} - i\frac{\partial}{\partial x_{j + n}} \right),\quad\frac{\partial}{\partial\overline{z_{j}}} = \frac{1}{2}\left( \frac{\partial}{\partial x_{j}} + i\frac{\partial}{\partial x_{j + n}} \right).
$$

容易验证

$$
\overline{\frac{\partial f}{\partial z_{j}}} = \frac{\partial\overline{f}}{\partial\overline{z_{j}}},\quad\overline{\frac{\partial f}{\partial\overline{z_{j}}}} = \frac{\partial\overline{f}}{\partial z_{j}}.
$$

多重指标记号也可扩充到偏微分算子：$\forall\alpha,\beta \in {\mathbb{N}}^{n}$，

$$
D^{\alpha\overline{\beta}} ≔ \frac{\partial^{|\alpha| + |\beta|}}{\partial z_{1}^{\alpha_{1}}\cdots\partial z_{n}^{\alpha_{n}}\partial\overline{z_{1}^{\beta_{1}}}\cdots\partial\overline{z_{n}^{\beta_{n}}}},
$$

$$
D^{\alpha} ≔ \frac{\partial^{|\alpha|}}{\partial z_{1}^{\alpha_{1}}\cdots\partial z_{n}^{\alpha_{n}}},\quad D^{\overline{\beta}} ≔ \frac{\partial^{|\beta|}}{\partial\overline{z_{1}^{\beta_{1}}}\cdots\partial\overline{z_{n}^{\beta_{n}}}}.
$$

其具有性质：$\forall\alpha,\beta \in {\mathbb{N}}^{n}$，$|\alpha| + |\beta| \leq k$，有 $f \in C^{k}(D) \Longleftrightarrow D^{\alpha\overline{\beta}} \in C(D)$。

## 区域上的全纯函数

设 $D \subset {\mathbb{C}}^{n}$ 为一区域，$f:D \rightarrow {\mathbb{C}}$ 为一复值函数，若 $f \in C^{1}(D)$，且 $f$ 满足如下**齐次 Cauchy-Riemann 方程组**：

$$
\frac{\partial f}{\partial\overline{z_{j}}} = 0,\quad\forall 1 \leq j \leq n,\quad z \in D,
$$

则称 $f$ 在 $D$ 内**全纯**。

在单变量的情形下，若一个定义在区域 $D \subset {\mathbb{C}}$ 上的复值函数 $f$ 在 $D$ 上任一点的局部均可展开为幂级数，则称 $f$ 在 $D$ 上全纯。多变量情形下，也有类似的全纯函数幂级数定义：

设 $D \subset {\mathbb{C}}^{n}$ 为一区域，$f:D \rightarrow {\mathbb{C}}$ 为一复值函数。若对任一点 $z^{(0)} \in D$，均存在 $z^{(0)}$ 的一个开邻域 $U \subset D$，使得 $\forall z \in U$，

$$
f(z) = \sum_{\alpha \in {\mathbb{N}}^{n}}\mathcal{a}_{\alpha}\left( z - z^{(0)} \right)^{\alpha} ≔ \sum_{\alpha_{1},\cdots,\alpha_{n} = 0}^{+ \infty}\mathcal{a}_{\alpha_{1},\cdots,\alpha_{n}}\prod_{j = 1}^{n}\left( z_{j} - z_{j}^{(0)} \right)^{\alpha_{j}},
$$

则称 $f$ 在 $D$ 内**全纯**。上述两个全纯函数定义是**等价**的。

## Hartogs 定理

记 $\mathcal{O}(D)$ 为 $D$ 上全体全纯函数的集合。若 $\Omega$ 是 $C^{n}$ 中的任意子集（例如紧子集或更为一般的闭集），则 $\mathcal{O}(\Omega)$ 表示在包含 $\Omega$ 的某个邻域上的全纯函数的集合。

约定 $f = g,\forall f,g \in \mathcal{O}(\Omega) \Longleftrightarrow$ 存在 $\Omega$ 的某一邻域 $D$，使得 $f(z) = g(z),\forall z \in D$。

由全纯函数定义，立得：

**定理**:
对任何子集 $\Omega \subset {\mathbb{C}}^{n}$，$\mathcal{O}(\Omega)$ 在逐点加法和数乘意义下封闭。任一关于 $z_{1},\cdots,z_{n}$ 的复系数多项式在 ${\mathbb{C}}^{n}$ 上是全纯的，从而在 $\mathcal{O}(\Omega)$ 里。若 $f,g \in \mathcal{O}(\Omega)$，且 $g(z) \neq 0,\forall z \in \Omega$，则 $f/g \in \mathcal{O}(\Omega)$。

任意满足齐次 Cauchy-Riemann 方程组的函数 $f$ 也分别关于单复变量 $z_{j}$ 全纯。反过来，则有如下 Hartogs 定理：

**定理** (F. Hartogs, 1906):
设 $D \subset {\mathbb{C}}^{n}$ 为一区域，$f:D \rightarrow {\mathbb{C}}$。若 $f$ 分别关于每一单复变量 $z_{j}(1 \leq j \leq n)$ 全纯，则 $f \in \mathcal{O}(D)$。

上述定理说明全纯函数定义中的 $f \in C^{1}(D)$ 为多余条件。

Hartogs 定理在实变函数论中不成立：设 $f:{\mathbb{R}}^{2} \rightarrow {\mathbb{R}}^{2}$，

$$
f(x,y) = \begin{cases}

\displaystyle{\frac{xy}{x^{4} + y^{4}}},\quad & (x,y) \neq (0,0), \\

0,\quad & (x,y) = (0,0).

\end{cases}
$$

显然 $f$ 关于 $x,y$ 均是实解析的，但其在 $(0,0)$ 处无界。

## Osgood 定理

**引理** (Osgood):
设 $D \subset {\mathbb{C}}$ 为一区域，$f:D \rightarrow {\mathbb{C}}$。若 $f \in C(D)$，且 $f$ 分别关于每一单复变量 $z_{j}(1 \leq j \leq n)$ 全纯，则 $f \in \mathcal{O}(D)$。

_证明_:
任选一点 $z^{(0)} \in D$ 以及 $P\left( z^{(0)},r \right) \subset \subset D$，由于 $f$ 在 $\overline{P\left( z^{(0)},r \right)}$ 的邻域内关于每一单复变量全纯，可以重复使用单复变量全纯函数的 Cauchy 积分公式，得

$$
f(z) = \left( \frac{1}{2\pi i} \right)^{n}\int_{\left| {\zeta_{1} - z_{1}^{(0)}} \right| = r_{1}}\frac{d\zeta_{1}}{\zeta_{1} - z_{1}}\cdots\int_{\left| {\zeta_{n} - z_{n}^{(0)}} \right| = r_{n}}\frac{f(\zeta)d\zeta_{n}}{\zeta_{n} - z_{n}}
$$

对任意 $z \in P\left( z^{(0)},r \right)$ 均成立。对任意固定点 $z$，上式各积分的被积函数均在 $D$ 的紧子集

$$
\left\{ \zeta = \left( \zeta_{1},\cdots,\zeta_{n} \right) \in {\mathbb{C}}^{n}:\left| {\zeta_{1} - z_{1}^{(0)}} \right| = r_{1},\cdots,\left| {\zeta_{n} - z_{n}^{(0)}} \right| = r_{n} \right\}
$$

上连续，于是上式的累次积分可替换为重积分

$$
f(z) = \left( \frac{1}{2\pi i} \right)^{n}\int\mspace{-5mu}\cdots\mspace{-5mu}\int_{\mathfrak{b}P\left( z^{(0)},r \right)}\frac{f(\zeta)d\zeta_{1}\cdots d\zeta_{n}}{\prod_{j = 1}^{n}\left( \zeta_{j} - z_{j} \right)}.
$$

注意到对固定的 $z \in P\left( z^{(0)},r \right)$，级数

$$
\prod_{j = 1}^{n}\left( \zeta_{j} - z_{j} \right)^{- 1} = \sum_{\alpha_{1},\cdots,\alpha_{n} = 0}^{+ \infty}\prod_{j = 1}^{n}\frac{\left( z_{j} - z_{j}^{(0)} \right)^{\alpha_{j}}}{\left( \zeta_{j} - z_{j}^{(0)} \right)^{\alpha_{j} + 1}}
$$

对所有 $\zeta \in {\mathfrak{b}P\left( z^{(0)},r \right)}$ 绝对收敛、一致收敛。于是可将级数代入重积分中，并交换求和积分次序，得

$$
f(z) = \sum_{\alpha_{1},\cdots,\alpha_{n} = 0}^{+ \infty}\mathcal{a}_{\alpha_{1},\cdots,\alpha_{n}}\prod_{j = 1}^{n}\left( z_{j} - z_{j}^{(0)} \right)^{\alpha_{j}},
$$

其中

$$
\mathcal{a}_{\alpha_{1},\cdots,\alpha_{n}} ≔ \left( \frac{1}{2\pi i} \right)^{n}\int\mspace{-5mu}\cdots\mspace{-5mu}\int_{\mathfrak{b}P\left( z^{(0)},r \right)}\frac{f(\zeta)d\zeta_{1}\cdots d\zeta_{n}}{\prod_{j = 1}^{n}\left( \zeta_{j} - z_{j}^{(0)} \right)^{\alpha_{j} + 1}}.
$$

由 $z^{(0)}$ 任意性可知 $f(z)$ 在 $D$ 上全纯。

**引理** (Schwarz):
记 $\mathbb{D}$ 为复平面上的单位圆盘，$f:{\mathbb{D}} \rightarrow {\mathbb{D}}$ 是 $\mathbb{D}$ 上全纯函数且 $f(0) = 0$，则 $\forall z \in {\mathbb{D}}$，$\left| {f(z)} \right| \leq |z|$ 且 $\left| {f\prime(0)} \right| \leq 1$。若存在 $z$ 使得 $\left| {f(z)} \right| = |z|$ 或者 $\left| {f\prime(0)} \right| = 1$，则 $f$ 为一旋转 $f(z) = \mathcal{a}z$，其中 $\left| \mathcal{a} \right| = 1$。

**定理** (Osgood):
设 $\Omega \subset {\mathbb{C}}$ 为一区域，$f:\Omega \rightarrow {\mathbb{C}}$ 局部有界且分别关于每一单复变量 $z_{j}(1 \leq j \leq n)$ 全纯，则 $f \in \mathcal{O}(\Omega)$。

_证明_:
由 Osgood 引理，只需证 $f \in C(\Omega)$。设 $w \in \Omega$，任取 $r > 0$ 使得 $P(2,2r) \subset \Omega$，记 $g_{j}(z,w) = f\left( w_{1},\cdots,w_{j},z_{j + 1},\cdots,z_{n} \right)$，对任意 $z \in P(w,r)$ 有

$$
\begin{aligned}

f(z) - f(w) = f(z) & - g_{(1)(z,w)} + g_{1}(z,w) - g_{2}(z,w) + \cdots \\

 & + g_{(n - 1)(z,w)} - f(w).

\end{aligned}
$$

$f$ 局部有界，记

$$
M ≔ \sup\limits_{z \in P(w,2r)}\left| {f(z)} \right| < + \infty,
$$

$\mathbb{D}$ 为单位圆盘。定义 $\bigtriangleup (a,r) = \left\{ t \in {\mathbb{C}}:\left| {t - a} \right| < r \right\}$，取双全纯映射

$$
h_{j}:{\mathbb{D}} \rightarrow \bigtriangleup (w_{j + 1},r),\quad h_{j}(t) = w_{j + 1} + rt.
$$

令

$$
F_{j}(t) ≔ \frac{f\left( w_{1},\cdots,w_{j},h(t),z_{j + 2},\cdots,z_{n} \right) - f\left( w_{1},\cdots,w_{j},h(0),z_{j + 2},\cdots,z_{n} \right)}{2M},
$$

则 $F_{j}(t) \in \mathcal{O}({\mathbb{D}})$，$F_{j}(0) = 0$ 且 $\left| {F_{j}(t)} \right| < 1$，由 Schwarz 引理，$\left| {F_{j}(t)} \right| \leq |t|$。

取 $t = \left( z_{j + 1} - w_{j + 1} \right)/r$，则有

$$
2M\left| {F_{j}(t)} \right| = 2M\left| {g_{j}(z,w) - g_{j + 1}(z,w)} \right| \leq \frac{2M}{r}\left| {z - w} \right|,
$$

于是

$$
\left| {f(z) - f(w)} \right| \leq \frac{2M}{r}\sum_{j = 1}^{n}\left| {z_{j} - w_{j}} \right|,
$$

即 $f$ 局部 Lipschitz 连续。
