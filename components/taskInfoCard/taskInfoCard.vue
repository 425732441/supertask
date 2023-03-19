<template>
	<view class="card-container">
		<uni-card :class="cardStatusClass" :title="taskInfo.taskName" :extra="('优先级：'+taskInfo.taskPriority)">
			<!-- :sub-title="'截止日期：' +this.taskInfo.taskDeadline" :extra="('优先级：'+this.taskInfo.taskPriority) || '' " -->

			<view class="card_title">
				<view v-if="taskInfo.taskTag">
					<uni-tag :text="taskInfo.taskTag.text" :type="taskInfo.taskTag.type"></uni-tag>
				</view>
				<view v-if="taskInfo.taskDeadline">
					{{taskInfo.taskDeadline+" 截止"}}
				</view>
			</view>

			<view class="uni-body">
				<text>
					{{taskInfo.taskDescription}}
				</text>
			</view>


			<!-- <view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsClick('分享')">
					<uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">分享</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('点赞')">
					<uni-icons type="heart" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">点赞</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('评论')">
					<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">评论</text>
				</view>
			</view> -->
		</uni-card>
	</view>
</template>

<script>
	export default {
		name: "taskInfoCard",
		props: {
			taskInfoProp: {
				type: Object,
				default: null
			}
		},
		onLoad() {
			// this.taskInfo = this.taskInfoProp;
			// console.log(this.taskInfo);
		},
		computed: {
			cardStatusClass() {
				return 'card_status_class_' + (this.taskInfo.taskStatus || 'notstart');
			}
		},
		data() {
			return {
				taskInfo: this.taskInfoProp
				// {
				// 	taskName: '',
				// 	taskImages: [],
				// 	taskDescription: '',
				// 	taskDeadline: '',
				// 	taskStartTime: '',
				// 	taskPriority: 'medium',
				// 	taskTags: [],
				// 	taskStaus: '未开始'
				// }


			};
		}
	}

</script>

<style scoped lang="scss">
	.card-container {
		margin: 10upx;

		.card_status_class_notstart {
			background-color: #ffd7d9;

		}

		.card_status_class_inprogress {
			background-color: #fff1a6;
		}


		.card_status_class_finished {
			background-color: #c7ffae;
		}

		.card {
			background-color: #55ffff;
		}

		.card_title {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
		}

		.uni-body {
			margin: 10upx;
			max-height: 100upx;
			overflow-y: auto;
		}
	}


	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}

</style>

