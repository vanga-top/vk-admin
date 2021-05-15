<template>
	<scroll-view class="sidebar" scroll-y="true" v-loading="!vk.getVuex('$app.inited')">
		<vk-data-menu-nav v-if="vk.getVuex('$app.inited')"
			:data="vk.getVuex('$app.navMenu')"
			:uniqueOpened="true"
			@select="select"
		></vk-data-menu-nav>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			select(e){
				
			},
		},
		// 监听属性
		watch: {
			$route: {
				immediate: true,
				handler(newRoute, oldRoute) {
					let that = this;
					let { vk } = that;
					let { path , query } = newRoute;
					let url = path + vk.pubfn.queryParams(query);
					let route = { path, query, url };
					vk.setVuex('$app.route', route);
				}
			}
		},
		// 计算属性
		computed: {

		},
	}
</script>

<style lang="scss">
	.sidebar {
		position: fixed;
		top: var(--window-top);
		width: 240px;
		height: calc(100vh - (var(--window-top)) + 50px);
		box-sizing: border-box;
		border-right: 1px solid darken($left-window-bg-color, 3%);
		background-color: $left-window-bg-color;
		padding-bottom: 10px;
		top: 50px;
		z-index: 998;
	}

	.title {
		margin-left: 5px;
	}
	.center{
		text-align: center;
		margin-top: 100px;
	}
</style>
