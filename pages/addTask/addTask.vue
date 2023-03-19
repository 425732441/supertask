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
			<uni-forms-item class="tagItem" label="任务标签">
				<uni-tag type="primary" text="工作">工作</uni-tag>
				<uni-tag type="success" text="学习">学习</uni-tag>
				<uni-tag type="warning" text="生活">生活</uni-tag>
			</uni-forms-item>
			<uni-forms-item label="任务描述">
				<uni-easyinput type="textarea" v-model="taskInfo.taskDescription" placeholder="请输入任务描述"></uni-easyinput>
			</uni-forms-item>
			<button type="primary" @click="submitForm">提交</button>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rules: {
					// 对name字段进行必填验证
					"taskName": {
						rules: [{
							required: true,
							errorMessage: '请输入任务名称',
						}]
					}
				},
				taskInfo: {
					taskName: '',
					taskTag: null,
					taskStatus: 'finished',
					taskDescription: '',
					taskDeadline: '',
					taskStartTime: '',
					taskPriority: 1

				},
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
			submitForm() {
				this.$refs.taskForm.validate().then(res => {
					console.log('表单数据信息：', res);
					uni.$emit("addTask", this.taskInfo);

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

