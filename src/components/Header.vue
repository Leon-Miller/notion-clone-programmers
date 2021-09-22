<template>
  <header>
    <div class="titles">
      <template
        v-for="(workspace, index) in $store.state.workspace.currentWorkspacePath"
        :key="workspace.id">
        <div
          v-if="index > 0"
          class="division">
          /
        </div>
        <button
          class="title"
          @click="$router.push({
            name: 'Workspace',
            params: {
              id: workspace.id
            }
          })">
          {{ workspace.title || '제목 없음' }}
        </button>
      </template>
    </div>
    <div class="actions">
      <button>공유</button>
      <button>업데이트</button>
      <button>즐겨찾기</button>
      <button>기타</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 45px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  .titles {
    flex-grow: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    .division {
      margin: 0 2px;
      color: rgba($color-font, .4);
    }
    .title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .actions {
    flex-shrink: 0;
    display: flex;
  }
}
button {
  color: $color-font;
  background: none;
  border: none;
  outline: none;
  font-size: 14px;
  height: 28px;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: $color-background;
  }
}
</style>