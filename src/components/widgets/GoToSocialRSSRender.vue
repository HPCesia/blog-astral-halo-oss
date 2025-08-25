<script setup lang="ts">
import '@/styles/markdown.css';
import { t } from '@utils/i18n';
import dayjs from 'dayjs';
import { type Ref, nextTick, onMounted, ref } from 'vue';
import { z } from 'zod';

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  },
});

const gtsBaseMediaAttachmentSchema = z.object({
  id: z.string(),
  url: z.string(),
  description: z.string().nullable(),
});

const gtsImageVideoAttachmentSchema = gtsBaseMediaAttachmentSchema.extend({
  type: z.enum(['image', 'video']),
  preview_url: z.string(),
  meta: z.object({
    original: z.object({
      width: z.number(),
      height: z.number(),
    }),
    small: z.object({
      width: z.number(),
      height: z.number(),
    }),
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

const statuses: Ref<GTSStatus[]> = ref([]);
const isLoading = ref(true);
const error: Ref<string | null> = ref(null);

const CACHE_KEY = 'gts-statuses-cache';
const CACHE_EXPIRE = 30 * 60 * 1000;

function getFromCache(): GTSStatus[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cacheObj = JSON.parse(raw);
    if (Date.now() - cacheObj.timestamp > CACHE_EXPIRE) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cacheObj.data;
  } catch (e) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

function saveToCache(data: GTSStatus[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (e) {
    // ignore
  }
}

async function loadStatuses() {
  const processImageZoom = async function () {
    await nextTick();
    if (error.value === null) {
      function initPhotoSwipe() {
        const lightbox = new window.lightbox({
          gallery: '#statuses-list li',
          children: 'a[data-pswp-src]',
          pswpModule: window.pswpModuleImporter,
        });
        lightbox.init();

        document.addEventListener(
          'astro:before-swap',
          () => {
            if (lightbox) {
              lightbox.destroy();
            }
          },
          { once: true }
        );
      }

      if (window.lightbox) {
        initPhotoSwipe();
      } else {
        document.addEventListener('pswp:enable', initPhotoSwipe, { once: true });
      }
    }
  };

  const cached = getFromCache();

  if (cached) {
    statuses.value = cached;
    isLoading.value = false;
    await processImageZoom();
    return;
  }

  try {
    const response = await fetch(`${props.apiUrl}?limit=30`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const rawData: GTSStatus[] = await response.json();
    if (!Array.isArray(rawData)) {
      throw new Error('Invalid data format received from GoToSocial API');
    }
    const data = rawData.map((status) => {
      const parsed = gtsStatusSchema.safeParse(status);
      if (!parsed.success) {
        console.error('Failed to parse status:', parsed.error);
        return null;
      }
      const data = parsed.data;
      data.emojis.map((emoji) => {
        data.content = data.content.replace(
          new RegExp(`:${emoji.shortcode}:`, 'g'),
          `<inline class="h-fit inline-block align-text-bottom"><img src="${emoji.url}" alt="${emoji.shortcode}" data-zoom /></inline>`
        );
      });
      return data;
    });

    statuses.value = data.filter((status) => status !== null);
    saveToCache(statuses.value);

    await processImageZoom();
  } catch (e) {
    console.error('Error fetching or parsing GoToSocial statuses:', e);
    error.value = (e as Error).message;
  } finally {
    isLoading.value = false;
  }
}

async function refreshStatuses() {
  isLoading.value = true;
  error.value = null;
  statuses.value = [];
  localStorage.removeItem(CACHE_KEY);
  await loadStatuses();
}

onMounted(async () => {
  await loadStatuses();
});
</script>

<template>
  <div v-if="isLoading" class="justify-center text-center flex items-center gap-2 my-6">
    <span class="loading loading-spinner loading-sm"></span>
    <span class="text-lg">加载中...</span>
  </div>
  <div v-else-if="error" class="text-error">{{ error }}</div>
  <ul v-else class="grid grid-cols-1 gap-4 relative" id="statuses-list">
    <button
      @click="refreshStatuses"
      class="btn btn-ghost btn-sm btn-square text-base absolute -top-10 right-0"
      :disabled="isLoading"
      :title="t.common.refresh()"
      :aria-label="t.common.refresh()"
    >
      ↻
    </button>
    <li
      v-for="status in statuses"
      :key="status.id"
      class="border border-base-300 bg-base-200 rounded-box overflow-hidden"
    >
      <div class="p-4 grid grid-cols-1 gap-4">
        <a :href="status.account.url" class="flex items-center gap-2">
          <img
            :src="status.account.avatar"
            :alt="status.account.avatar_description"
            class="avatar w-10 rounded-full"
          />
          <span :href="status.account.url" class="font-bold link-hover">{{
            status.account.display_name
          }}</span>
          <span class="text-sm text-base-content/60 link-hover"
            >@{{ status.account.username }}</span
          >
        </a>
        <article
          v-if="status.content.length > 0 && !status.sensitive"
          v-html="status.content"
        ></article>
        <details v-if="status.sensitive" class="group">
          <summary
            class="cursor-pointer text-sm text-base-content/60 group-open:text-primary grid grid-cols-2 w-fit items-center gap-1"
            :title="status.spoiler_text || '显示内容'"
          >
            <div class="btn btn-primary btn-sm btn-square swap group-open:swap-active">
              <div class="swap-on" aria-hidden="true"><slot name="eyeCloseIcon" /></div>
              <div class="swap-off" aria-hidden="true"><slot name="eyeOpenIcon" /></div>
            </div>
            <span>{{ status.spoiler_text || '显示内容' }}</span>
          </summary>
          <article v-html="status.content"></article>
        </details>
        <div
          v-if="status.media_attachments.length"
          class="carousel carousel-center px-2 space-x-4 rounded-md"
        >
          <div
            v-for="attachment in status.media_attachments"
            :key="attachment.id"
            class="carousel-item w-80 h-80 overflow-clip rounded-md bg-base-content/10"
          >
            <details
              :open="status.sensitive ? undefined : true"
              class="w-full h-full relative group"
            >
              <summary
                tabindex="-1"
                :title="attachment.description || undefined"
                class="absolute w-full h-full z-1 p-4 cursor-pointer grid grid-cols-3 group-open:grid-cols-1 group-open:w-auto group-open:h-auto"
              >
                <div class="btn btn-primary rounded-md btn-square swap group-open:swap-active">
                  <div class="swap-on" aria-hidden="true"><slot name="eyeCloseIcon" /></div>
                  <div class="swap-off" aria-hidden="true"><slot name="eyeOpenIcon" /></div>
                </div>
                <div
                  class="group-open:hidden absolute btn w-fit text-ellipsis whitespace-nowrap self-center overflow-hidden col-start-2"
                >
                  显示内容
                </div>
              </summary>
              <a
                v-if="attachment.type === 'image'"
                :data-pswp-src="attachment.url"
                :data-pswp-width="attachment.meta.original.width"
                :data-pswp-height="attachment.meta.original.height"
                data-cropped="true"
                class="h-full w-full absolute cursor-zoom-in"
              >
                <img
                  :src="attachment.preview_url"
                  :width="attachment.meta.small.width"
                  :height="attachment.meta.small.height"
                  :alt="attachment.description || ''"
                  class="object-cover w-full h-full duration-100"
                />
              </a>
              <video v-if="attachment.type === 'video'" controls class="max-w-full rounded">
                <source :src="attachment.url" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <audio v-if="attachment.type === 'audio'" controls class="max-w-full rounded">
                <source :src="attachment.url" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </details>
          </div>
        </div>
      </div>
      <div class="bg-base-200/50 py-2 px-4 flex justify-between items-center flex-wrap gap-4">
        <div class="flex flex-wrap gap-2.5">
          <span class="text-sm text-base-content/60">
            发布于
            <a class="link" :href="status.url" target="_blank" rel="noopener noreferrer">
              <time class="text-sm text-base-content/60 ml-0.25">
                {{ dayjs(status.created_at).format('YYYY-MM-DD HH:mm:ss') }}
              </time>
            </a>
          </span>
          <span class="text-sm text-base-content/60" v-if="status.edited_at">
            最后编辑于
            <time class="ml-0.25">
              {{ dayjs(status.edited_at).format('YYYY-MM-DD HH:mm:ss') }}
            </time>
          </span>
        </div>
        <div class="flex gap-4">
          <span class="text-sm text-base-content/60 flex items-center gap-1.5">
            <slot name="likeIcon" /> <span>{{ status.favourites_count }}</span>
          </span>
          <span class="text-sm text-base-content/60 flex items-center gap-1.5">
            <slot name="reblogIcon" /> <span>{{ status.reblogs_count }}</span>
          </span>
          <span class="text-sm text-base-content/60 flex items-center gap-1.5">
            <slot name="replyIcon" /> <span>{{ status.replies_count }}</span>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<style>
article pre {
  border-style: var(--tw-border-style);
  border-width: 1px;
  border-radius: 0.5rem;
  border-color: var(--color-base-300);
  background-color: color-mix(in oklab, var(--color-base-100) 20%, transparent);
}

article p {
  margin: 0.5rem 0;
}
</style>
