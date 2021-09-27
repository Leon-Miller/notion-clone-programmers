<template>
  <nav 
    ref="nav"
    :style="{ width: `${navWidth}px` }">
    <div class="header">
      <div class="user-profile"></div>
      <div class="title">
        Leon's Notion
      </div>
      <div style="flex-grow: 1; margin-right: 10px;"></div>
      <Loader :loading="$store.getters['workspace/loading']" />
    </div>
    <ul>
      <WorkspaceItem
        v-for="workspace in workspaces"
        :key="workspace.id"
        :workspace="workspace" />
    </ul>
    <div class="actions">
      <div
        class="action"
        @click="$store.dispatch('workspace/createWorkspace')">
        <span class="material-icons">add</span> 새로운 페이지  
      </div>
    </div>
    <div
      ref="resizeHandle"
      class="resize-handle"
      @dblclick="navWidth = 240"></div>
  </nav>
</template>

<script>
import interact from 'interactjs'
import WorkspaceItem from '~/components/WorkspaceItem'
import Loader from '~/components/Loader'

export default {
  components: {
    WorkspaceItem,
    Loader
  },
  data() {
    return {
      navWidth: 240
    }
  },
  computed: {
    workspaces() {
      return this.$store.state.workspace.workspaces
    }
  },
  created() {
    this.workspacesInit()
  },
  mounted() {
    this.navInit()
  },
  methods: {
    async workspacesInit() {
      await this.$store.dispatch('workspace/readWorkspaces')
      if (this.$route.fullPath === '/') {
        this.$router.push({
          name: 'Workspace',
          params: {
            id: this.$store.state.workspace.workspaces[0].id
          }
        })
      }
    },
    navInit() {
      interact(this.$refs.nav)
        .resizable({
          edges: {
            right: this.$refs.resizeHandle
          }
        })
        .on('resizemove', event => {
          this.navWidth = event.rect.width
        })
    }
  }
}
</script>

<style lang="scss" scoped>
nav { 
  max-width: 500px;
  min-width: 160px; 
  flex-shrink: 0;
  height: 100%;
  background-color: $color-background;
  display: flex;
  flex-direction: column;
  position: relative;
  .header {
    padding: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    .user-profile {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      margin-right: 10px;
      background-image: url("https://avatars.githubusercontent.com/u/87857358?v=4");
      background-size: cover;
      flex-shrink: 0;
    }
    .title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  ul {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .actions {
    border-top: 1px solid $color-border;
    .action {
      height: 45px;
      display: flex;
      align-items: center;
      padding: 0 14px;
      color: $color-icon;
      cursor: pointer;
      &:hover {
        background-color: $color-background--hover1;
      }
      .material-icons {
        margin-right: 4px;
        color: $color-icon;
      }
    }
  }
  .resize-handle {
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    cursor: col-resize;
    transition: .4s;
    &:hover {
      background-color: $color-border;
    }
  }
}
</style>