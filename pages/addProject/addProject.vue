<template>
	<view class="content">
		<uni-section title="项目名称" sub-title="请输入项目的名称,不可与已有项目名称重复" type="line">
			<uni-easyinput focus placeholder="请输入项目名称" v-model="project.name" />
		</uni-section>
		<!-- <view class="tui-btn-box">
			<view class="tui-btn-btm">
				<tui-button type="white" shape="circle" @click="showDtPicker">日期+时间</tui-button>
			</view>
		</view>
		<tui-datetime ref="dateTime" :type="type" :unitTop="false" :radius="false"
			@confirm="changeDateTime"></tui-datetime> -->
		<uni-section title="项目图标" sub-title="请选择一张图片作为项目图标" type="line">
			<uni-file-picker fileMediatype="image" mode="grid" @select="uploadComplete" @fail="fail" :limit="1" />
		</uni-section>
		<button type="primary" @click="saveProject">保存</button>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				type: 1,
				startYear: 2000,
				endYear: 2099,
				project: {
					name: '',
					createTime: '',
					imagePath: '',
					imagePaths: null,
					tasks: []
				}

			}
		},
		methods: {
			...mapGetters(['getProjects', 'getProjectInfoByName']),
			...mapMutations(['setProjects']),
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
				return !(this.$store.getters.getProjectInfoByName(this.project.name));
			},
			addProjectInfoToStorage() {
				this.project.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
				let projects = this.getProjects();
				if (projects) {
					projects.push(this.project);
				} else {
					projects = [];
					projects.push(this.project);
				}
				this.setProjects(projects);
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
				const filePaths = param.tempFilePaths;
				this.project.imagePath = filePaths[0];
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

<style scoped lang="scss">
	.tui-btn-box {
		padding: 10rpx 40rpx;
		box-sizing: border-box;
	}

	.tui-btn-btm {
		margin-bottom: 36rpx;
	}

</style>

