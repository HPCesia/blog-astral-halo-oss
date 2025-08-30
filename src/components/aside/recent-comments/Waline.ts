import type { CommentData, CommentProvider } from './types';
import { cleanCommentHtml } from './utils';
import { asideConfig, commentConfig } from '@/config';

export const WalineProvider: CommentProvider = {
  async setup() {
    const walineConfig = commentConfig.waline!;
    const commentCount = asideConfig.recentComment.count;
    const apiUrl = `${walineConfig.serverURL}/api/comment?type=recent&count=${commentCount}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch recent comments');
    }

    const data: {
      nick: string;
      sticky: 0 | 1;
      status: string;
      link: string;
      comment: string;
      url: string;
      user_id: string;
      objectId: string;
      browser: string;
      os: string;
      type: string;
      label: string;
      avatar: string;
      orig: string;
      addr: string;
      like: number;
      time: number;
    }[] = (await response.json()).data;

    return data.map(
      (item): CommentData => ({
        avatarUrl: item.avatar,
        commentContent: cleanCommentHtml(item.comment),
        commentUrl: `${item.url}#${item.objectId}`,
        author: item.nick,
        time: new Date(item.time),
      })
    );
  },
};
