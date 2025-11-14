<template>
  <footer class="mt-28 surface border-t">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-muted justify-items-center items-center">
        <div class="space-y-1">
          <p class="font-medium text-base-content/90">Quotd.</p>
          <p>2025 — All rights reserved.</p>
        </div>
        <div class="space-y-1">
          <p class="font-medium text-base-content/90">Links</p>
          <div class="flex flex-wrap gap-4">
            <template v-for="link in links" :key="link.link">
              <a
                v-if="link.link.startsWith('http')"
                :href="link.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted text-sm"
              >
                {{ link.label }}
              </a>
              <router-link
                v-else
                :to="link.link"
                :class="`text-muted text-sm ${route.path === link.link ? 'font-semibold text-base-content' : ''}`"
              >
                {{ link.label }}
              </router-link>
            </template>
          </div>
        </div>
        <div class="space-y-1">
          <p class="font-medium text-base-content/90">Follow</p>
          <div class="flex gap-2">
            <a
              :href="socialLinks.github"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 border border-border rounded-full hover:bg-surface-hover"
            >
              <IconBrandGithub :size="18" />
            </a>
            <a
              :href="socialLinks.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 border border-border rounded-full hover:bg-surface-hover"
            >
              <IconBrandLinkedin :size="18" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const links = [
  { link: 'https://ephodstudio.com/#get-quote', label: 'Contact' },
  { link: 'https://mitchellwallace.dev', label: 'Portfolio' },
  { link: 'https://checkboxd.vercel.app/', label: 'Checkboxd' },
];

const socialLinks = {
  github: 'https://github.com/mitchell-wallace',
  linkedin: 'https://linkedin.com/in/mitchell-wallace-dev',
};
</script>
