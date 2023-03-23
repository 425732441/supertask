<template>
	<view>
		<uni-section type="line" title="任务列表" sub-title="按右下角➕号添加任务,👉🏻滑任务可以快速完成当前任务">
			<view>
				<uni-swipe-action ref="swipeAction">
					<uni-swipe-action-item :key="index" v-for="(task,index) in project.tasks" :threshold='30'
						@change="changeSwipe($event,task)" :auto-close="true" @click="clickActionButton($event,task)">
						<template v-slot:left>
							<view class="action-button-wrap">
								<text style="writing-mode: vertical-lr;">完成任务</text>
							</view>
						</template>
						<taskInfoCard :taskInfoProp="task" />
					</uni-swipe-action-item>
				</uni-swipe-action>
				<z-no-data v-if="!project.tasks" imgUrl="/static/images/toast/img_nodata.png">暂无数据</z-no-data>
			</view>
		</uni-section>
		<uni-fab @fabClick="fabClick" horizontal="right"></uni-fab>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				project: {
					name: ''
				},
			}
		},
		watch: {
			project: {
				handler: function(n, o) {
					console.log('watch project', n);
					this.setProjects(this.getProjects());
				},
				deep: true
			}
		},
		onBackPress(e) {
			console.log('back press', e);
			this.back();
			return true;
		},
		onUnload() {
			console.log('onunload');
			// this.back();
			//如果多端发布的话判断一下当前操作的客户端 
			//#ifdef MP-WEIXIN
			wx.reLaunch({
				url: '/pages/index/index'
			})
			//#endif
		},

		onLoad(e) {
			console.log('oload ', e.name, this.$store);
			console.log(this.$store.getters.getProjectInfoByName(e.name));

			this.project = this.$store.getters.getProjectInfoByName(e.name);
			uni.setNavigationBarTitle({
				'title': e.name + '-项目详情'
			});
		},
		methods: {
			...mapGetters(['getProjects', 'getProjectInfoByName']),
			...mapMutations(['setProjects']),
			clickActionButton(e, task) {
				console.log(e, task);
			},

			back() {
				uni.switchTab({
					url: '/pages/index/index',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			changeSwipe(e, task) {
				if (e === 'left') {
					task.taskStatus = 'finished';
					this.setProjects(this.getProjects())
					setTimeout(() => {
						this.$refs.swipeAction.closeAll();
					}, 100);

					console.log('完成任务', task.taskName, e, task);
				}
			},


			fabClick() {
				uni.navigateTo({
					url: '/pages/addTask/addTask?projectName=' + this.project.name,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}

</script>

<style>
	.action-button-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70upx;
	}

</style>

