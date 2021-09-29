<template>
  <li>
    <div 
      :style="{ paddingLeft: `${14 * depth}px` }"
      :class="{ active: parseInt($route.params.id, 10) === workspace.id }"
      class="title"
      @click="$router.push({
        name: 'Workspace',
        params: {
          id: workspace.id
        }
      })">
      <span
        :class="{ active: showChildren }"
        class="material-icons"
        @click.stop="showChildren = !showChildren">
        play_arrow
      </span>
      <span class="text">
        {{ workspace.title || '제목 없음' }}
      </span>
      <div class="actions">
        <span
          class="material-icons"
          @click.stop="createWorkspace">
          add
        </span>
        <span
          class="material-icons"
          @click.stop="deleteWorkspace">
          delete
        </span>
      </div>
    </div>
    <div
      v-if="!hasChildren && showChildren"
      :style="{ paddingLeft: `${14 * depth + 22}px` }"
      class="no-children">
      하위 페이지가 없습니다.
    </div>
    <ul v-if="hasChildren && showChildren">
      <WorkspaceItem
        v-for="ws in workspace.documents"
        :key="ws.id"
        :workspace="ws"
        :depth="depth + 1" />
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    workspace: {
      type: Object,
      default: () => ({})
    },
    depth: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      showChildren: false
    }
  },
  computed: {
    hasChildren() {
      return this.workspace.documents && this.workspace.documents.length
    }
  },
  created() {
    // 자신(WorkspaceItem.vue)이 현재 워크스페이스 경로에 해당하는 항목이 맞는지 체크!
    this.showChildren = this.$store.state.workspace.currentWorkspacePath
      .some(workspace => workspace.id === this.workspace.id)
  },
  methods: {
    async createWorkspace() {
      await this.$store.dispatch('workspace/createWorkspace', {
        parentId: this.workspace.id
      })
      this.showChildren = true
    },
    deleteWorkspace() {
      this.$store.dispatch('workspace/deleteWorkspace', {
        id: this.workspace.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  .title {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 14px;
    color: rgba($color-font, .7);
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: $color-background--hover1;
      padding-right: 4px;
      .actions {
        display: flex;
      }
    }
    &.active {
      background-color: $color-background--hover1;
      &:hover {
        background-color: $color-background--hover2;
      }
      .text {
        font-weight: 700;
        color: rgba($color-font, .8);
      }
    }
    .material-icons {
      font-size: 18px;
      color: $color-icon;
      margin-right: 4px;
      &:hover {
        background-color: $color-background--hover2;
      }
      &.active {
        transform: rotate(90deg);
      }
    }
    .text {
      flex-grow: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .actions {
      display: none;
      align-items: center;
    }
  }
  .no-children {
    color: rgba($color-font, .35);
    height: 30px;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; 
  }
}
</style>