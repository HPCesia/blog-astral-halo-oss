import type { APIRoute } from 'astro';

type EmotionGroup = {
  name: string;
  type: 'emoticon' | 'emoji' | 'image';
  container: {
    icon: string;
    text: string;
  }[];
};

interface MiHoYoEmoticon {
  status: string;
  name: string;
  icon: string;
  list: {
    status: string;
    name: string;
    icon: string;
  }[];
}

interface MiHoYoResponse {
  data: {
    list: MiHoYoEmoticon[];
  };
}

const kaomoji: EmotionGroup = {
  name: '颜文字',
  type: 'emoticon',
  container: [
    {
      icon: '|´・ω・)ノ',
      text: '',
    },
    {
      icon: 'ヾ(≧∇≦*)ゝ',
      text: '',
    },
    {
      icon: '(≧∇≦)ﾉ',
      text: '',
    },
    {
      icon: '(☆ω☆)',
      text: '',
    },
    {
      icon: '（╯‵□′）╯︵┴─┴',
      text: '',
    },
    {
      icon: '￣﹃￣',
      text: '',
    },
    {
      icon: '(/ω＼)',
      text: '',
    },
    {
      icon: '∠( ᐛ 」∠)＿',
      text: '',
    },
    {
      icon: '(๑•̀ㅁ•́ฅ)',
      text: '',
    },
    {
      icon: '→_→',
      text: '',
    },
    {
      icon: '(눈_눈)',
      text: '',
    },
    {
      icon: '୧(๑•̀⌄•́๑)૭',
      text: '',
    },
    {
      icon: '(ノ°ο°)ノ',
      text: '',
    },
    {
      icon: '(´இ皿இ｀)',
      text: '',
    },
    {
      icon: '⌇●﹏●⌇',
      text: '',
    },
    {
      icon: '(ฅ´ω`ฅ)',
      text: '',
    },
    {
      icon: 'φ(￣∇￣o)',
      text: '',
    },
    {
      icon: 'ヾ(´･ ･｀｡)ノ"',
      text: '',
    },
    {
      icon: '( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃',
      text: '',
    },
    {
      icon: '(ó﹏ò｡)',
      text: '',
    },
    {
      icon: 'Σ(っ °Д °;)っ',
      text: '',
    },
    {
      icon: '━━Σ(￣□￣*|||━━',
      text: '',
    },
    {
      icon: '╮(╯▽╰)╭',
      text: '',
    },
    {
      icon: 'ᕕ( ᐛ )ᕗ',
      text: '',
    },
    {
      icon: '(๑• . •๑)',
      text: '',
    },
    {
      icon: 'Σ(ﾟДﾟ；≡；ﾟдﾟ)',
      text: '',
    },
    {
      icon: '(*´∀`)~♥',
      text: '',
    },
    {
      icon: 'ԅ(¯﹃¯ԅ)',
      text: '',
    },
    {
      icon: '✧(≖ ◡ ≖✿)',
      text: '',
    },
    {
      icon: '(＠_＠;)',
      text: '',
    },
    {
      icon: '(ง •_•)ง',
      text: '',
    },
  ],
};

const nahida: EmotionGroup = {
  name: '纳西妲',
  type: 'image',
  container: [
    {
      text: 'Nahida-探头',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/1.gif'>",
    },
    {
      text: 'Nahida-查岗',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/2.gif'>",
    },
    {
      text: 'Nahida-晕',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/3.gif'>",
    },
    {
      text: 'Nahida-禁止',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/4.gif'>",
    },
    {
      text: 'Nahida-就要',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/5.gif'>",
    },
    {
      text: 'Nahida-加载',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/6.gif'>",
    },
    {
      text: 'Nahida-哭',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/7.gif'>",
    },
    {
      text: 'Nahida-好',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/8.gif'>",
    },
    {
      text: 'Nahida-好耶',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/9.gif'>",
    },
    {
      text: 'Nahida-卧槽',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/10.gif'>",
    },
    {
      text: 'Nahida-生气',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/11.gif'>",
    },
    {
      text: 'Nahida-裂开',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/12.gif'>",
    },
    {
      text: 'Nahida-心',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/13.gif'>",
    },
    {
      text: 'Nahida-无语',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/14.gif'>",
    },
    {
      text: 'Nahida-元气',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/15.gif'>",
    },
    {
      text: 'Nahida-好不好',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/16.gif'>",
    },
    {
      text: 'Nahida-拜托',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Nahida01/17.gif'>",
    },
  ],
};

const bilibiliTv: EmotionGroup = {
  name: '小电视',
  type: 'image',
  container: [
    {
      text: 'bilibili_tv_gif-doge',
      icon: "<img src='https://images.hpcesia.com/3de5568861758.gif'>",
    },
    {
      text: 'bilibili_tv_gif-亲亲',
      icon: "<img src='https://images.hpcesia.com/48f8fb39734fd.gif'>",
    },
    {
      text: 'bilibili_tv_gif-偷笑',
      icon: "<img src='https://images.hpcesia.com/f7272fe624fae.gif'>",
    },
    {
      text: 'bilibili_tv_gif-再见',
      icon: "<img src='https://images.hpcesia.com/8252ffdb2cd6c.gif'>",
    },
    {
      text: 'bilibili_tv_gif-发怒',
      icon: "<img src='https://images.hpcesia.com/6fc804d102f33.gif'>",
    },
    {
      text: 'bilibili_tv_gif-发财',
      icon: "<img src='https://images.hpcesia.com/934731e956a6d.gif'>",
    },
    {
      text: 'bilibili_tv_gif-可爱',
      icon: "<img src='https://images.hpcesia.com/df742ca600b6f.gif'>",
    },
    {
      text: 'bilibili_tv_gif-吐血',
      icon: "<img src='https://images.hpcesia.com/825e474035d41.gif'>",
    },
    {
      text: 'bilibili_tv_gif-呆',
      icon: "<img src='https://images.hpcesia.com/dc01b83c8b63c.gif'>",
    },
    {
      text: 'bilibili_tv_gif-呕吐',
      icon: "<img src='https://images.hpcesia.com/e84d2b2f164d5.gif'>",
    },
    {
      text: 'bilibili_tv_gif-困',
      icon: "<img src='https://images.hpcesia.com/1ebb4265e35d6.gif'>",
    },
    {
      text: 'bilibili_tv_gif-坏笑',
      icon: "<img src='https://images.hpcesia.com/0d4b84c868ac1.gif'>",
    },
    {
      text: 'bilibili_tv_gif-大佬',
      icon: "<img src='https://images.hpcesia.com/554bc754252fb.gif'>",
    },
    {
      text: 'bilibili_tv_gif-大哭',
      icon: "<img src='https://images.hpcesia.com/a61cf83e2a393.gif'>",
    },
    {
      text: 'bilibili_tv_gif-委屈',
      icon: "<img src='https://images.hpcesia.com/bb706ad009ca3.gif'>",
    },
    {
      text: 'bilibili_tv_gif-害羞',
      icon: "<img src='https://images.hpcesia.com/6783d7b3f85b5.gif'>",
    },
    {
      text: 'bilibili_tv_gif-尴尬',
      icon: "<img src='https://images.hpcesia.com/94fde68114d10.gif'>",
    },
    {
      text: 'bilibili_tv_gif-微笑',
      icon: "<img src='https://images.hpcesia.com/ae8b966f5d6dd.gif'>",
    },
    {
      text: 'bilibili_tv_gif-思考',
      icon: "<img src='https://images.hpcesia.com/4779160502ea4.gif'>",
    },
    {
      text: 'bilibili_tv_gif-惊吓',
      icon: "<img src='https://images.hpcesia.com/cf308976cfcff.gif'>",
    },
    {
      text: 'bilibili_tv_gif-打脸',
      icon: "<img src='https://images.hpcesia.com/1e73ac65adedb.gif'>",
    },
    {
      text: 'bilibili_tv_gif-抓狂',
      icon: "<img src='https://images.hpcesia.com/a9a2816b47155.gif'>",
    },
    {
      text: 'bilibili_tv_gif-抠鼻子',
      icon: "<img src='https://images.hpcesia.com/da0e09a7df77c.gif'>",
    },
    {
      text: 'bilibili_tv_gif-斜眼笑',
      icon: "<img src='https://images.hpcesia.com/ef02f8604d8da.gif'>",
    },
    {
      text: 'bilibili_tv_gif-无奈',
      icon: "<img src='https://images.hpcesia.com/34f110a029e9f.gif'>",
    },
    {
      text: 'bilibili_tv_gif-晕',
      icon: "<img src='https://images.hpcesia.com/3c1ec79da1798.gif'>",
    },
    {
      text: 'bilibili_tv_gif-流汗',
      icon: "<img src='https://images.hpcesia.com/f8476b1819899.gif'>",
    },
    {
      text: 'bilibili_tv_gif-流鼻血',
      icon: "<img src='https://images.hpcesia.com/0c7f2fc4aa9ac.gif'>",
    },
    {
      text: 'bilibili_tv_gif-点赞',
      icon: "<img src='https://images.hpcesia.com/3a52c830b19d1.gif'>",
    },
    {
      text: 'bilibili_tv_gif-生气',
      icon: "<img src='https://images.hpcesia.com/52386ddb3e00b.gif'>",
    },
    {
      text: 'bilibili_tv_gif-生病',
      icon: "<img src='https://images.hpcesia.com/a196e70f1892d.gif'>",
    },
    {
      text: 'bilibili_tv_gif-疑问',
      icon: "<img src='https://images.hpcesia.com/5df1be7cebfcc.gif'>",
    },
    {
      text: 'bilibili_tv_gif-白眼',
      icon: "<img src='https://images.hpcesia.com/dde92b9d44d0a.gif'>",
    },
    {
      text: 'bilibili_tv_gif-睡着',
      icon: "<img src='https://images.hpcesia.com/fde17be95e29a.gif'>",
    },
    {
      text: 'bilibili_tv_gif-笑哭',
      icon: "<img src='https://images.hpcesia.com/6c2742bef700b.gif'>",
    },
    {
      text: 'bilibili_tv_gif-腼腆',
      icon: "<img src='https://images.hpcesia.com/c23c85b649289.gif'>",
    },
    {
      text: 'bilibili_tv_gif-色',
      icon: "<img src='https://images.hpcesia.com/f75d5f33ae1df.gif'>",
    },
    {
      text: 'bilibili_tv_gif-调皮',
      icon: "<img src='https://images.hpcesia.com/1d06267e48ecb.gif'>",
    },
    {
      text: 'bilibili_tv_gif-鄙视',
      icon: "<img src='https://images.hpcesia.com/5696d02abd653.gif'>",
    },
    {
      text: 'bilibili_tv_gif-闭嘴',
      icon: "<img src='https://images.hpcesia.com/1f90ef05d7af2.gif'>",
    },
    {
      text: 'bilibili_tv_gif-难过',
      icon: "<img src='https://images.hpcesia.com/7535d32a53d50.gif'>",
    },
    {
      text: 'bilibili_tv_gif-馋',
      icon: "<img src='https://images.hpcesia.com/13375b80ddacb.gif'>",
    },
    {
      text: 'bilibili_tv_gif-黑人问号',
      icon: "<img src='https://images.hpcesia.com/48f24129bf37c.gif'>",
    },
    {
      text: 'bilibili_tv_gif-鼓掌',
      icon: "<img src='https://images.hpcesia.com/d7e60de1a2e5b.gif'>",
    },
  ],
};

const bugcatCapoo: EmotionGroup = {
  name: '猫猫虫',
  type: 'image',
  container: [
    {
      text: '猫猫虫-看手机震惊',
      icon: "<img src='https://images.hpcesia.com/6728bad30638f.webp'>",
    },
    {
      text: '猫猫虫-牛',
      icon: "<img src='https://images.hpcesia.com/6728bbe09c2b7.webp'>",
    },
    {
      text: '猫猫虫-爆哭',
      icon: "<img src='https://images.hpcesia.com/6728bb860ef51.webp'>",
    },
    {
      text: '猫猫虫-波奇',
      icon: "<img src='https://images.hpcesia.com/6728bb5d829bf.webp'>",
    },
    {
      text: '猫猫虫-烧香礼拜',
      icon: "<img src='https://images.hpcesia.com/6728bc5559e5f.webp'>",
    },
    {
      text: '猫猫虫-什么',
      icon: "<img src='https://images.hpcesia.com/6728bce0b9140.webp'>",
    },
    {
      text: '猫猫虫-不！！',
      icon: "<img src='https://images.hpcesia.com/6728bcfa20123.webp'>",
    },
    {
      text: '猫猫虫-狂舔',
      icon: "<img src='https://images.hpcesia.com/6728bc81d7064.webp'>",
    },
    {
      text: '猫猫虫-委屈哭',
      icon: "<img src='https://images.hpcesia.com/6728bda9b4f50.webp'>",
    },
    {
      text: '猫猫虫-不听',
      icon: "<img src='https://images.hpcesia.com/6728bdc29294b.webp'>",
    },
    {
      text: '猫猫虫-睡觉',
      icon: "<img src='https://images.hpcesia.com/6728be1c8be52.webp'>",
    },
    {
      text: '猫猫虫-大汗',
      icon: "<img src='https://images.hpcesia.com/6728be3ae8caa.webp'>",
    },
    {
      text: '猫猫虫-喜欢',
      icon: "<img src='https://images.hpcesia.com/6728be5378dcd.webp'>",
    },
    {
      text: '猫猫虫-冷',
      icon: "<img src='https://images.hpcesia.com/6728be933de5e.webp'>",
    },
    {
      text: '猫猫虫-满分',
      icon: "<img src='https://images.hpcesia.com/6728bf21cbdf7.webp'>",
    },
    {
      text: '猫猫虫-心碎',
      icon: "<img src='https://images.hpcesia.com/6728bf3feabb3.webp'>",
    },
    {
      text: '猫猫虫-谢谢',
      icon: "<img src='https://images.hpcesia.com/6728bf4c2226f.webp'>",
    },
    {
      text: '猫猫虫-躺倒',
      icon: "<img src='https://images.hpcesia.com/6728bf57dc67d.webp'>",
    },
    {
      text: '猫猫虫-舔屏',
      icon: "<img src='https://images.hpcesia.com/6728bf8bb56a0.webp'>",
    },
    {
      text: '猫猫虫-撒钱',
      icon: "<img src='https://images.hpcesia.com/6728bfea14905.webp'>",
    },
    {
      text: '猫猫虫-拒绝',
      icon: "<img src='https://images.hpcesia.com/6728bfc0c27a5.webp'>",
    },
    {
      text: '猫猫虫-看立了',
      icon: "<img src='https://images.hpcesia.com/6728c05f320fe.webp'>",
    },
    {
      text: '猫猫虫-看软了',
      icon: "<img src='https://images.hpcesia.com/6728c0679d678.webp'>",
    },
    {
      text: '猫猫虫-为什么',
      icon: "<img src='https://images.hpcesia.com/6728c24533671.webp'>",
    },
    {
      text: '猫猫虫-打call',
      icon: "<img src='https://images.hpcesia.com/6728c25fcefd1.webp'>",
    },
    {
      text: '猫猫虫-拍键盘',
      icon: "<img src='https://images.hpcesia.com/6728c25daeb5b.gif'>",
    },
    {
      text: '猫猫虫-要钱',
      icon: "<img src='https://images.hpcesia.com/6728c260abab1.webp'>",
    },
    {
      text: '猫猫虫-笨笨',
      icon: "<img src='https://images.hpcesia.com/6728c3b07cee6.webp'>",
    },
    {
      text: '猫猫虫-好',
      icon: "<img src='https://images.hpcesia.com/6728c3af92400.webp'>",
    },
    {
      text: '猫猫虫-星星眼',
      icon: "<img src='https://images.hpcesia.com/6728c3aeb289d.webp'>",
    },
    {
      text: '猫猫虫-怒',
      icon: "<img src='https://images.hpcesia.com/6728c3adb3e1c.webp'>",
    },
    {
      text: '猫猫虫-记录',
      icon: "<img src='https://images.hpcesia.com/6728c458cc7f6.webp'>",
    },
    {
      text: '猫猫虫-喝茶',
      icon: "<img src='https://images.hpcesia.com/6728c4579eec0.webp'>",
    },
    {
      text: '猫猫虫-非常好',
      icon: "<img src='https://images.hpcesia.com/6728c4568b7e8.webp'>",
    },
    {
      text: '猫猫虫-给你花花',
      icon: "<img src='https://images.hpcesia.com/6728d7637c4e8.webp'>",
    },
    {
      text: '猫猫虫-问号',
      icon: "<img src='https://images.hpcesia.com/674abb86cbf8f.jpg'>",
    },
    {
      text: '猫猫虫-流口水',
      icon: "<img src='https://images.hpcesia.com/674abc7c0b513.gif'>",
    },
    {
      text: '猫猫虫-喔喔喔',
      icon: "<img src='https://images.hpcesia.com/674abbcf5eac5.gif'>",
    },
  ],
};

const sirin: EmotionGroup = {
  name: '西琳',
  type: 'image',
  container: [
    {
      text: 'Sirin-1',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Sirin01/1.gif'>",
    },
    {
      text: 'Sirin-2',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Sirin01/2.gif'>",
    },
    {
      text: 'Sirin-3',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Sirin01/3.gif'>",
    },
    {
      text: 'Sirin-4',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Sirin01/4.gif'>",
    },
    {
      text: 'Sirin-5',
      icon: "<img src='https://blog.hpcesia.com/assets/img/emotions/Sirin01/5.gif'>",
    },
  ],
};

async function fetchMiHoYoEmoticons(
  apiUrl: string,
  groups?: string[],
  useIndexImg: boolean = false
): Promise<EmotionGroup[]> {
  const STYLE = 'height: 20px;top: 4px;position: relative;';
  const response = await fetch(apiUrl);
  const data: MiHoYoResponse = await response.json();
  const result: EmotionGroup[] = [];
  for (const emoticon of data.data.list) {
    if (emoticon.status === 'draft') continue;
    const groupName = emoticon.name;
    if (groups && !groups.includes(groupName)) continue;
    const group: EmotionGroup = {
      name: useIndexImg
        ? `<img src='${emoticon.icon}' style='${STYLE}' title='${groupName}'>`
        : groupName,
      type: 'image',
      container: [],
    };
    for (const item of emoticon.list) {
      if (item.status === 'draft') continue;
      const name = item.name.replace(/ /g, '-');
      const baseName = groupName.replace(/ /g, '-');
      group.container.push({
        text: `${baseName}-${name}`,
        icon: `<img src='${item.icon}'>`,
      });
    }
    result.push(group);
  }
  return result;
}

const apiUrl = 'https://bbs-api.mihoyo.com/misc/api/emoticon_set';
const emotionsList = ['原神 V官方', '崩坏RPG', '崩坏 星穹铁道', '崩坏3-1'];
const miHoYoEmoticons = await fetchMiHoYoEmoticons(apiUrl, emotionsList, false);

const emotionGroups = [kaomoji, nahida, bilibiliTv, bugcatCapoo, sirin, ...miHoYoEmoticons];

export const GET: APIRoute = async function (_) {
  return new Response(
    JSON.stringify(
      emotionGroups.reduce(
        (acc, group) => {
          acc[group.name] = {
            type: group.type,
            container: group.container,
          };
          return acc;
        },
        {} as Record<string, { type: string; container: { icon: string; text: string }[] }>
      )
    )
  );
};
