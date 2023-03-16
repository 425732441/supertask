<template>
	<view class="container">
		<uni-forms :label-width="120" label-align="left">
			<uni-forms-item label="任务名称" required>
				<uni-easyinput v-model="taskName" placeholder="请输入任务名称"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="任务截止日期" required>
				<uni-datetime-picker v-model="taskDeadline" type="date" placeholder="请选择任务截止日期"></uni-datetime-picker>
			</uni-forms-item>
			<uni-forms-item label="任务优先级">
				<uni-data-checkbox v-model="taskTag" :localdata="taskTags" />
			</uni-forms-item>
			<uni-forms-item class="tagItem" label="任务标签">
				<uni-tag type="primary" text="工作">工作</uni-tag>
				<uni-tag type="success" text="学习">学习</uni-tag>
				<uni-tag type="warning" text="生活">生活</uni-tag>
			</uni-forms-item>
			<uni-forms-item label="任务描述">
				<uni-easyinput type="textarea" v-model="taskDescription" placeholder="请输入任务描述"></uni-easyinput>
			</uni-forms-item>
			<button type="primary" @click="submitForm">提交</button>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taskName: '',
				taskTag: null,
				taskDescription: '',
				taskDeadline: '',
				taskPriority: 'medium',
				taskTags: [{
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

