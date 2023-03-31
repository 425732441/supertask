<template>
	<view>
		<uni-section type="line" title="任务列表" sub-title="按右下角➕号添加任务,左滑任务进行菜单操作,右滑进行中的任务可以快速完成">
			<view>
				<uni-swipe-action ref="swipeAction">
					<uni-swipe-action-item :right-options="rightOpthons" :key="index"
						v-for="(task,index) in project.tasks" :threshold='30' @change="changeSwipe($event,task)"
						:auto-close="true" @click="clickActionButton($event,task,index)">
						<template v-slot:left v-if="task.taskStatus === 'inprogress'">
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
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="popupType" cancelText="取消" confirmText="确认" title="警告"
				:content="`确认删除当前任务:${currentTaskName}？`" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import { mapGetters, mapMutations } from 'vuex';
	import { taskInfoUtil } from "@/utils/taskInfoUtil";
	export default {
		data() {
			return {
				popupType: 'warn',
				currentTaskName: '',
				currentTaskIndex: null,
				rightOpthons: [
					{ text: "开始任务", style: { backgroundColor: '#40c35f' } },
					{ text: "修改", style: { backgroundColor: '#C8C7CD' } },
					{ text: "删除", style: { backgroundColor: '#FD3B31' } }
				],
				project: {
					name: '',
				},
			}
		},
		watch: {
			"project.tasks": {
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
			this.project = this.$store.getters.getProjectInfoByName(e.name);
			uni.setNavigationBarTitle({
				'title': e.name + '-项目详情'
			});
		},
		methods: {
			...mapGetters(['getProjects', 'getProjectInfoByName']),
			...mapMutations(['setProjects']),
			confirm() {
				this.project.tasks.splice(this.currentTaskIndex, 1);
			},
			clickActionButton(e, task, index) {

				const i = e.index;
				// i === 0 开始， i === 1 修改， i === 2 删除
				if (i === 0) {
					// 判断任务可以开始
					if (task.taskStatus === 'notstart') {
						task.taskStatus = 'inprogress';
						task.taskStartTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
					} else {
						uni.showToast({
							title: '任务已在' + taskInfoUtil.getTaskStatusText(task.taskStatus),
							icon: 'error'
						});
					}
				} else if (i === 1) {} else if (i === 2) {
					this.currentTaskName = task.taskName;
					this.currentTaskIndex = index;
					this.$refs.alertDialog.open();
				}
				console.log(e, task, index);
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
					if (task.taskStatus !== 'inprogress') {
						uni.showToast({
							title: '任务没在进行中',
							icon: 'error'
						});
					} else {
						task.taskStatus = 'finished';
						task.taskFinishTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
						this.setProjects(this.getProjects());
					}

					setTimeout(() => {
						this.$refs.swipeAction.closeAll();
					}, 100);
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

<style lang="scss">
	@import "@/uni.scss";

	.action-button-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70upx;
	}

	/deep/ .button-group--right {
		margin: $uni-card-container-margin;
	}

</style>

