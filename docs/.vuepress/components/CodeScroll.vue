<template>
  <div class="h-scroller">
    <div ref="contentRef">
      <slot></slot>
    </div>
    <div
      ref="thumbRef"
      class="thumb"
      :style="{ width: `${thumbWidth}px`, transform: `translateX(${thumbTranslateX}px)` }"
    ></div>
    <div
      class="thumb-mask"
      :class="{ moving: mouseDowning }"
      :style="{
        width: `${thumbWidth}px`,
        transform: `translate(${thumbMaskTranslateX}px, ${thumbMaskTranslateY}px)`,
        ...(mouseDowning
          ? {
              top: `${thumbMaskTop}px`,
              left: `${thumbMaskLeft}px`,
            }
          : {}),
      }"
      @mousedown.stop="handleMouseDown"
      @mouseup.stop="handleMouseUp"
      @mousemove.stop="handleMouseMove"
    ></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CodeScroll',
  data() {
    return {
      preEl: null,
      codeEl: null,

      thumbWidth: 0,
      thumbMaxLimitX: 0,
      middleOfThumb: 0,
      fitMiddleDiff: 0,

      thumbTranslateX: 0,
      thumbMaskTranslateX: 0,
      thumbMaskTranslateY: 0,

      thumbMaskTop: 0,
      thumbMaskLeft: 0,

      mouseDowning: false,
      prevMouseX: 0,
      prevMouseY: 0,
    };
  },
  mounted() {
    const isMobile = 'ontouchstart' in document.documentElement;
    if (!isMobile && this.$refs.contentRef && this.$refs.thumbRef) {
      this.getThumbWidth();
      window.addEventListener('resize', this.handleReSize);
    }
  },
  beforeDestroy() {
    const isMobile = 'ontouchstart' in document.documentElement;
    if (!isMobile) {
      window.removeEventListener('resize', this.handleReSize);
    }
  },
  methods: {
    getThumbWidth() {
      this.preEl = this.$refs.contentRef.querySelector('pre');
      this.codeEl = this.$refs.contentRef.querySelector('code');

      if (!this.preEl || !this.codeEl) {
        return;
      }

      this.preEl.classList.add('no-scroll');

      const prePadding = this.codeEl.offsetLeft;
      const preWidth = this.preEl.getBoundingClientRect().width;
      const codeWidth = this.codeEl.getBoundingClientRect().width;

      this.thumbWidth = (preWidth / (codeWidth + prePadding * 4)) * preWidth;
      if (this.thumbWidth >= preWidth) {
        this.thumbWidth = 0;
      }

      const thumbInfo = this.$refs.thumbRef.getBoundingClientRect();
      this.thumbMaxLimitX = preWidth - this.thumbWidth;
      this.middleOfThumb = thumbInfo.x + this.thumbWidth / 2;
    },
    restoreMask() {
      // Restore the position of mask
      this.thumbMaskTranslateX = this.thumbTranslateX;
      this.thumbMaskTranslateY = 0;
    },
    handleReSize() {
      this.getThumbWidth();
    },
    handleMouseDown(ev) {
      this.mouseDowning = true;

      this.prevMouseX = ev.x;
      this.prevMouseY = ev.y;

      this.restoreMask();

      // Redraw mask in position: fixed
      const thumbInfo = this.$refs.thumbRef.getBoundingClientRect();
      this.thumbMaskTop = thumbInfo.y;
      this.thumbMaskLeft = thumbInfo.x;

      // Transform mask to middle point
      this.fitMiddleDiff = ev.x - this.middleOfThumb;
      this.thumbMaskTranslateX += this.fitMiddleDiff;
      this.thumbMaskTranslateY -= 250;

      document.body.classList.add('ban-select');
    },
    handleMouseUp() {
      this.mouseDowning = false;
      this.restoreMask();
      // Restore the y of mouse
      this.prevMouseY = 0;
      document.body.classList.remove('ban-select');
    },
    handleMouseMove(ev) {
      window.requestAnimationFrame(() => {
        if (this.mouseDowning) {
          this.thumbMaskTranslateX += ev.x - this.prevMouseX;
          this.thumbMaskTranslateY += ev.y - this.prevMouseY;

          const maskRealTranslate = this.thumbMaskTranslateX - this.fitMiddleDiff;

          if (maskRealTranslate < 0) {
            this.thumbTranslateX = 0;
          } else if (maskRealTranslate > this.thumbMaxLimitX) {
            this.thumbTranslateX = this.thumbMaxLimitX;
          } else {
            this.thumbTranslateX = maskRealTranslate;
          }

          this.prevMouseX = ev.x;
          this.prevMouseY = ev.y;

          this.preEl.scrollLeft = this.thumbTranslateX;
        }
      });
    },
  },
});
</script>

<style scoped lang="stylus">
.h-scroller
  width 100%
  overflow hidden
  position relative

  &:hover
    .thumb
      opacity 1

  .thumb
    height 7px
    background-color var(--vp-c-gray-light-2)
    position absolute
    bottom 0.85rem
    left 0
    border-radius 7px
    cursor pointer
    z-index 10
    opacity 0
    transition opacity 200ms ease

  .thumb-mask
    height 7px
    background-color rgba(255, 255, 255, 0)
    position absolute
    bottom 0.85rem
    left 0
    cursor pointer
    z-index 11

    &.moving
      height: 500px
      position fixed
      bottom auto

  .no-scroll
    overflow: hidden

html.dark
  .h-scroller
    .thumb
      background-color var(--vp-c-gray-dark-2)
</style>
