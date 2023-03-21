<template>
	<view>
		<uni-section type="line" title="任务列表" sub-title="按右下角➕号添加任务">
			<view>
				<uni-swipe-action ref="swipeAction">
					<uni-swipe-action-item :key="index" v-for="(task,index) in project.tasks" :threshold='30'
						@change="changeSwipe($event,task)" :auto-close="true" @click="clickActionButton($event,task)">
						<template v-slot:right>
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
	import storage from '@/utils/storage.js';
	export default {
		data() {
			return {
				project: {
					name: ''
				},
			}
		},
		onLoad(e) {

			this.project = storage.getProjectInfoByName(e.name);
			uni.setNavigationBarTitle({
				'title': e.name + '-项目详情'
			});
			uni.$on("addTask", this.addTask);
		},
		methods: {
			clickActionButton(e, task) {
				console.log(e, task);
			},
			changeSwipe(e, task) {
				if (e === 'right') {
					task.taskStatus = 'finished';
					console.log(this.$refs.swipeAction);
					setTimeout(() => {
						this.$refs.swipeAction.closeAll();
					}, 500)

					console.log('完成任务', task.taskName, e, task);
				}
			},
			addTask(taskInfo) {
				// 保存任务信息到当前项目中
				this.project.tasks = this.project.tasks || [];
				this.project.tasks.push(taskInfo);
				var projects = storage.getProjectsFromStorage();
				projects.map(p => {
					if (p.name === this.project.name) {
						p.tasks = this.project.tasks;
					}
				});
				console.log(projects);
				storage.setProjectsToStorage(projects);
				uni.navigateTo({
					url: '/pages/projectInfo/projectInfo?name=' + this.project.name,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			fabClick() {
				uni.navigateTo({
					url: '/pages/addTask/addTask',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}

</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.action-button-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70upx;
	}

</style>

