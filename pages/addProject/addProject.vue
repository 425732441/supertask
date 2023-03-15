<template>
	<view>
		<tui-input placeholder="请输入项目名称" v-model="project.name"></tui-input>
		<!-- <view class="tui-btn-box">
			<view class="tui-btn-btm">
				<tui-button type="white" shape="circle" @click="showDtPicker">日期+时间</tui-button>
			</view>
		</view>
		<tui-datetime ref="dateTime" :type="type" :unitTop="false" :radius="false"
			@confirm="changeDateTime"></tui-datetime> -->
		<tui-upload @complete="uploadComplete"></tui-upload>
		<tui-button @click="saveProject">保存</tui-button>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import storage from '@/utils/storage.js';
	export default {
		data() {
			return {
				type: 1,
				startYear: 2000,
				endYear: 2099,
				project: {
					name: '',
					createTime: '',
					imagePath: ''
				}

			}
		},
		methods: {
			changeDateTime(e) {
				console.log(e);
			},
			showDtPicker() {
				this.$refs.dateTime.show();

			},
			checkBeforeSave() {
				if (!this.project.name) {
					uni.showToast({
						title: '请填写项目名称!',
						icon: 'error'
					});
					return false;
				}
				if (!this.checkNameDuplicate()) {
					uni.showToast({
						title: '项目名称重复!',
						icon: 'error'
					});
					return false;
				}
				return true;
			},
			checkNameDuplicate() {

				console.log(storage.getProjectInfoByName(this.project.name));
				return !storage.getProjectInfoByName(this.project.name);
			},
			addProjectInfoToStorage() {
				this.project.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
				let projects = storage.getProjectsFromStorage();
				if (projects) {
					projects.push(this.project);
				} else {
					projects = [];
					projects.push(this.project);
				}
				storage.setProjectInfoToStorage(projects);
			},
			saveProject() {
				if (this.checkBeforeSave()) {
					this.addProjectInfoToStorage();

					uni.switchTab({
						url: '/pages/index/index',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				} else {

				}

			},
			uploadComplete(param) {
				console.log(param);
				if (param.status === 1) {
					const filePaths = param.imgArr;
					this.project.imagePath = filePaths[0];
				}
			}

		},
		watch: {
			'project': { // 对对象的某一个属性进行深度监听
				handler(nv) {
					console.log(nv)
				},
				immediate: true,
				deep: true
			}
		},
	}

</script>

<style>
	.tui-btn-box {
		padding: 10rpx 40rpx;
		box-sizing: border-box;
	}

	.tui-btn-btm {
		margin-bottom: 36rpx;
	}

</style>

