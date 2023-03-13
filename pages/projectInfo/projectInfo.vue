<template>
	<view>
		项目详情{{ project.name }}
	</view>
</template>

<script>
	import storage from '@/utils/storage.js';
	export default {
		data() {
			return {
				project: {
					name: ''
				}

			}
		},
		onLoad(e) {

			this.project = storage.getProjectInfoByName(e.name);
		},
		methods: {}
	}

</script>

<style>

</style>

