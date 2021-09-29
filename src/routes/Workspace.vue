<template>
  <!-- Vue.js는 최적화를 위해서 같은 구조의 컴포넌트를 재활용하려고 시도합니다.
       그래서 페이지가 바뀌더라도 <section>이 갱신되지 않을 수 있습니다.(특히 양식 요소)
       이 문제를 방지하려면 요소에 고유 값(key 속성)을 제공해서 페이지가 바뀔 때,
       새로운 <section>을 렌더링해야 한다고 명시할 수 있습니다! -->
  <section :key="$route.params.id">
    <div class="inner">
      <div
        ref="title"
        class="title"
        placeholder="제목 없음"
        contenteditable
        @input="onInput">
        {{ title }}
      </div>
      <!-- eslint-disable -->
      <div
        ref="content"
        class="content"
        placeholder="내용을 입력하세요!"
        contenteditable
        @input="onInput"
        v-html="content">
      </div>
      <!-- eslint-enable -->
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.state.workspace.currentWorkspace.title
    },
    content() {
      return this.$store.state.workspace.currentWorkspace.content
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('workspace/readWorkspace', {
        id: this.$route.params.id
      })  
      this.$store.dispatch('workspace/findWorkspacePath')
    }
  },
  created() {
    this.$store.dispatch('workspace/readWorkspace', {
      id: this.$route.params.id
    })
  },
  methods: {
    onInput() {
      if (!this.$refs.content.textContent.trim()) {
        this.$refs.content.innerHTML = ''
      }
      this.$store.dispatch('workspace/updateWorkspace', {
        id: this.$route.params.id,
        title: this.$refs.title.textContent,
        content: this.$refs.content.innerHTML
      }) 
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 100px 0 200px;
  .inner {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;
    [contenteditable] {
      outline: none;
      cursor: text;
      &.title {
        font-size: 44px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      &.content {
        font-size: 16px;
        line-height: 1.8;
      }
      &:empty::before {
        content: attr(placeholder);
        color: rgba($color-font, .3);
      }
    }
  }
}
</style>