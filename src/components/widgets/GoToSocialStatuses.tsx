import '@/styles/markdown.css';
import { t } from '@utils/i18n';
import dayjs from 'dayjs';
import type { Component } from 'solid-js';
import { For, Show, createSignal, onMount } from 'solid-js';
import { z } from 'zod';
import IMdiEye from '~icons/mdi/eye';
import IMdiEyeOff from '~icons/mdi/eye-off';
import IMdiHeart from '~icons/mdi/heart';
import IMdiMessage from '~icons/mdi/message';
import IMingcuteRocketLine from '~icons/mingcute/rocket-line';

interface Props {
  apiUrl: string;
}

const gtsBaseMediaAttachmentSchema = z.object({
  id: z.string(),
  url: z.string(),
  description: z.string().nullable(),
});
const gtsImageVideoAttachmentSchema = gtsBaseMediaAttachmentSchema.extend({
  type: z.enum(['image', 'video']),
  preview_url: z.string(),
  meta: z.object({
    original: z.object({ width: z.number(), height: z.number() }),
    small: z.object({ width: z.number(), height: z.number() }),
  }),
});
const gtsAudioAttachmentSchema = gtsBaseMediaAttachmentSchema.extend({
  type: z.literal('audio'),
  preview_url: z.null(),
  blurhash: z.null(),
});
const gtsMediaAttachmentSchema = z.union([
  gtsImageVideoAttachmentSchema,
  gtsAudioAttachmentSchema,
]);
const gtsAccountSchema = z.object({
  id: z.string(),
  username: z.string(),
  display_name: z.string(),
  avatar: z.string(),
  avatar_description: z.string(),
  url: z.string(),
});
const gtsEmojiSchema = z.object({
  shortcode: z.string(),
  url: z.string(),
});
const gtsStatusSchema = z.object({
  id: z.string(),
  url: z.string(),
  created_at: z.string(),
  edited_at: z.string().nullable(),
  sensitive: z.boolean(),
  spoiler_text: z.string(),
  content: z.string(),
  replies_count: z.number(),
  reblogs_count: z.number(),
  favourites_count: z.number(),
  emojis: z.array(gtsEmojiSchema),
  media_attachments: z.array(gtsMediaAttachmentSchema),
  account: gtsAccountSchema,
});
type GTSStatus = z.infer<typeof gtsStatusSchema>;

const CACHE_KEY = 'gts-statuses-cache';
const CACHE_EXPIRE = 30 * 60 * 1000;
const getFromCache = (): GTSStatus[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cacheObj = JSON.parse(raw);
    return Date.now() - cacheObj.timestamp > CACHE_EXPIRE ? null : cacheObj.data;
  } catch {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};
const saveToCache = (data: GTSStatus[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    /* ignore */
  }
};

const GoToSocialStatuses: Component<Props> = (props) => {
  const [statuses, setStatuses] = createSignal<GTSStatus[]>([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const processPhotoSwipe = () => {
    setTimeout(() => {
      if (error()) return;
      const initPS = () => {
        const lightbox = new window.lightbox({
          gallery: '#statuses-list li',
          children: 'a[data-pswp-src]',
          pswpModule: window.pswpModuleImporter,
        });
        lightbox.init();
        document.addEventListener('astro:before-swap', () => lightbox.destroy(), {
          once: true,
        });
      };
      if (window.lightbox) initPS();
      else document.addEventListener('pswp:enable', initPS, { once: true });
    });
  };
  /* ---- 主体加载逻辑 ---- */
  const loadStatuses = async () => {
    const cached = getFromCache();
    if (cached) {
      setStatuses(cached);
      setIsLoading(false);
      processPhotoSwipe();
      return;
    }
    try {
      const res = await fetch(`${props.apiUrl}?limit=30`, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error(`Network response was not ok: ${res.statusText}`);
      const rawData: GTSStatus[] = await res.json();
      const list = rawData
        .map((s) => {
          const parsed = gtsStatusSchema.safeParse(s);
          if (!parsed.success) {
            console.error('Failed to parse status:', parsed.error);
            return null;
          }
          const { data } = parsed;
          // emoji -> <inline><img …/>
          data.content = data.emojis.reduce(
            (html, emoji) =>
              html.replaceAll(
                new RegExp(`:${emoji.shortcode}:`, 'g'),
                `<inline class="h-fit inline-block align-text-bottom"><img src="${emoji.url}" alt="${emoji.shortcode}" data-zoom /></inline>`
              ),
            data.content
          );
          return data;
        })
        .filter((s) => !!s);
      setStatuses(list);
      saveToCache(list);
      processPhotoSwipe();
    } catch (e) {
      console.error('Error fetching statuses:', e);
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  /* ---- 刷新按钮 ---- */
  const refreshStatuses = async () => {
    setIsLoading(true);
    setError(null);
    setStatuses([]);
    localStorage.removeItem(CACHE_KEY);
    await loadStatuses();
  };
  /* ---- Astro 生命周期 ---- */
  onMount(async () => {
    await loadStatuses();
  });
  /* =============== 渲染 =============== */
  return (
    <div>
      <Show when={isLoading()}>
        <div class="justify-center text-center flex items-center gap-2 my-6">
          <span class="loading loading-spinner loading-sm"></span>
          <span class="text-lg">加载中...</span>
        </div>
      </Show>
      <Show when={error()}>
        <div class="text-error">{error()}</div>
      </Show>
      <Show when={!isLoading() && !error()}>
        <ul id="statuses-list" class="grid grid-cols-1 gap-4 relative">
          <button
            class="btn btn-ghost btn-sm btn-square text-base absolute -top-10 right-0"
            disabled={isLoading()}
            title={t.common.refresh()}
            aria-label={t.common.refresh()}
            onClick={refreshStatuses}
          >
            ↻
          </button>
          <For each={statuses()}>
            {(status) => (
              <li class="border border-base-300 bg-base-200 rounded-box overflow-hidden">
                <div class="p-4 grid grid-cols-1 gap-4">
                  {/* 用户 */}
                  <a href={status.account.url} class="flex items-center gap-2">
                    <img
                      src={status.account.avatar}
                      alt={status.account.avatar_description}
                      class="avatar w-10 rounded-full"
                    />
                    <span class="font-bold link-hover">{status.account.display_name}</span>
                    <span class="text-sm text-base-content/60 link-hover">
                      @{status.account.username}
                    </span>
                  </a>
                  {/* 内容 */}
                  <Show when={!status.sensitive}>
                    <article innerHTML={status.content} />
                  </Show>
                  <Show when={status.sensitive}>
                    <details class="group">
                      <summary
                        class="cursor-pointer text-sm text-base-content/60 group-open:text-primary grid grid-cols-2 w-fit items-center gap-1"
                        title={status.spoiler_text || '显示内容'}
                      >
                        <div class="btn btn-primary btn-sm btn-square swap group-open:swap-active">
                          <div class="swap-on" aria-hidden="true">
                            <IMdiEyeOff />
                          </div>
                          <div class="swap-off" aria-hidden="true">
                            <IMdiEye />
                          </div>
                        </div>
                        <span>{status.spoiler_text || '显示内容'}</span>
                      </summary>
                      <article innerHTML={status.content} />
                    </details>
                  </Show>
                  {/* 媒体 */}
                  <Show when={status.media_attachments.length}>
                    <div class="carousel carousel-center px-2 space-x-4 rounded-md">
                      <For each={status.media_attachments}>
                        {(attachment) => (
                          <div class="carousel-item w-80 h-80 overflow-clip rounded-md bg-base-content/10">
                            <details
                              open={status.sensitive ? undefined : true}
                              class="w-full h-full relative group"
                            >
                              <summary
                                tabindex={-1}
                                title={attachment.description || undefined}
                                class="absolute w-full h-full z-1 p-4 cursor-pointer grid grid-cols-3 group-open:grid-cols-1 group-open:w-auto group-open:h-auto"
                              >
                                <div class="btn btn-primary rounded-md btn-square swap group-open:swap-active">
                                  <div class="swap-on" aria-hidden="true">
                                    <IMdiEyeOff />
                                  </div>
                                  <div class="swap-off" aria-hidden="true">
                                    <IMdiEye />
                                  </div>
                                </div>
                                <div class="group-open:hidden absolute btn w-fit text-ellipsis whitespace-nowrap self-center overflow-hidden col-start-2">
                                  显示内容
                                </div>
                              </summary>
                              {/* 图片 */}
                              <Show when={attachment.type === 'image'}>
                                {(_) => {
                                  const image = attachment as z.infer<
                                    typeof gtsImageVideoAttachmentSchema
                                  >; // fix type error
                                  return (
                                    <a
                                      data-pswp-width={image.meta.original.width}
                                      data-pswp-height={image.meta.original.height}
                                      data-pswp-src={image.url}
                                      data-cropped="true"
                                      class="h-full w-full absolute cursor-zoom-in"
                                    >
                                      <img
                                        src={image.preview_url}
                                        width={image.meta.small.width}
                                        height={image.meta.small.height}
                                        alt={image.description || ''}
                                        class="object-cover w-full h-full duration-100"
                                      />
                                    </a>
                                  );
                                }}
                              </Show>
                              {/* 视频 */}
                              <Show when={attachment.type === 'video'}>
                                <video controls class="max-w-full rounded">
                                  <source src={attachment.url} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </Show>
                              {/* 音频 */}
                              <Show when={attachment.type === 'audio'}>
                                <audio controls class="max-w-full rounded">
                                  <source src={attachment.url} type="audio/mpeg" />
                                  Your browser does not support the audio element.
                                </audio>
                              </Show>
                            </details>
                          </div>
                        )}
                      </For>
                    </div>
                  </Show>
                </div>
                {/* 尾部信息 */}
                <div class="bg-base-200/50 py-2 px-4 flex justify-between items-center flex-wrap gap-4">
                  <div class="flex flex-wrap gap-2.5">
                    <span class="text-sm text-base-content/60">
                      发布于
                      <a
                        href={status.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link"
                      >
                        <time class="text-sm text-base-content/60 ml-0.25">
                          {dayjs(status.created_at).format('YYYY-MM-DD HH:mm:ss')}
                        </time>
                      </a>
                    </span>
                    <Show when={status.edited_at}>
                      <span class="text-sm text-base-content/60">
                        最后编辑于
                        <time class="ml-0.25">
                          {dayjs(status.edited_at!).format('YYYY-MM-DD HH:mm:ss')}
                        </time>
                      </span>
                    </Show>
                  </div>
                  <div class="flex gap-4">
                    <span class="text-sm text-base-content/60 flex items-center gap-1.5">
                      <IMdiHeart />
                      <span>{status.favourites_count}</span>
                    </span>
                    <span class="text-sm text-base-content/60 flex items-center gap-1.5">
                      <IMingcuteRocketLine />
                      <span>{status.reblogs_count}</span>
                    </span>
                    <span class="text-sm text-base-content/60 flex items-center gap-1.5">
                      <IMdiMessage />
                      <span>{status.replies_count}</span>
                    </span>
                  </div>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};
export default GoToSocialStatuses;
