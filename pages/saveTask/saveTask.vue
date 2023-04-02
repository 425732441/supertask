<template>
	<view class="container">
		<uni-forms ref="taskForm" :label-width="120" :model="taskInfo" :rules="rules" label-align="left">
			<uni-forms-item label="任务名称" name="taskName" required>
				<uni-easyinput :focus="true" v-model="taskInfo.taskName" placeholder="请输入任务名称"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="任务截止日期">
				<uni-datetime-picker v-model="taskInfo.taskDeadline" type="datetime"
					placeholder="请选择任务截止日期"></uni-datetime-picker>
			</uni-forms-item>
			<uni-forms-item label="任务优先级">
				<uni-data-checkbox v-model="taskInfo.taskPriority" :localdata="taskPriorities" />
			</uni-forms-item>
			<!-- <uni-forms-item class="tagItem" label="任务标签">
				<uni-tag type="primary" text="工作">工作</uni-tag>
				<uni-tag type="success" text="学习">学习</uni-tag>
				<uni-tag type="warning" text="生活">生活</uni-tag>
			</uni-forms-item> -->
			<uni-forms-item label="任务描述">
				<uni-easyinput type="textarea" v-model="taskInfo.taskDescription" placeholder="请输入任务描述"></uni-easyinput>
			</uni-forms-item>
			<button type="primary" @click="submitForm">提交</button>
		</uni-forms>
	</view>
</template>

<script>
	const taskInfoTemplate = {
		taskName: '',
		taskTag: null,
		taskStatus: 'notstart',
		taskDescription: '',
		taskDeadline: '',
		taskStartTime: '',
		taskFinishTime: '',
		taskPriority: 1

	};
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		onLoad(e) {
			if (e.mode) {
				this.mode = e.mode;
				uni.setNavigationBarTitle({
					title: `任务${this.mode === 'add'? '添加':'编辑'}`
				})
			}
			//重新初始化taskFromState taskInfo
			this.taskFromState = { ...taskInfoTemplate };
			this.taskInfo = { ...taskInfoTemplate };
			// 编辑
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on("loadPageSaveTask", (data) => {
				// data.task为state中的数据，是响应式的，因此不能直接改，
				// 收到后放入新对象中存起来做展示和用于修改，修改结束后保存时赋值给data.task即可触发全局数据的更新
				// this.setProjects(this.getProjects());

				if (data.task) {
					this.taskFromState = data.task;
					// taskInfo 使用一个新对象来赋值，放值修改taskInfo后触发state更新projects的数据
					this.taskInfo = { ...data.task };
				}
				if (data.project) {
					this.projectFromState = data.project;
				}

			})
		},
		data() {
			return {
				mode: 'add',
				taskFromState: taskInfoTemplate,
				projectFromState: null,
				rules: {
					// 对name字段进行必填验证
					"taskName": {
						rules: [{
							required: true,
							errorMessage: '请输入任务名称',
						}]
					}
				},
				projectName: '',
				taskInfo: taskInfoTemplate,
				taskPriorities: [{
					text: '高',
					value: 0
				}, {
					text: '中',
					value: 1
				}, {
					text: '低',
					value: 2
				}]
			}
		},
		methods: {
			...mapGetters(['getProjects', 'getProjectInfoByName']),
			...mapMutations(['setProjects']),
			saveTask(taskInfo) {
				// 保存任务信息到当前项目中

				if (this.mode === 'edit') {
					for (const key in this.taskFromState) {
						this.taskFromState[key] = this.taskInfo[key];
					}
					console.log(this.getProjects());
				} else {
					this.projectFromState.tasks = (this.projectFromState.tasks || []);
					this.projectFromState.tasks.push(taskInfo);
				}
				uni.navigateBack({
					delta: 1
				});
			},
			submitForm() {
				this.$refs.taskForm.validate().then(res => {
					this.saveTask(this.taskInfo);
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
				// 处理表单提交逻辑
			}
		}
	}

</script>


<style lang="scss">
	.container {
		margin: 15upx;
	}

	.tagItem {
		display: flex;
	}

</style>

