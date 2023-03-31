<template>
	<view class="card-container">

		<uni-card is-full :style="'--card-color:'+cardColor">
			<!-- :sub-title="'截止日期：' +this.taskInfo.taskDeadline" :extra="('优先级：'+this.taskInfo.taskPriority) || '' " -->

			<template v-slot:title>
				<view class="uni-card__header">
					<!-- 卡片标题 -->
					<view class="uni-card__header-box">
						<!-- <view v-if="thumbnail" class="uni-card__header-avatar">
							<image class="uni-card__header-avatar-image" :src="thumbnail" mode="aspectFit" />
						</view> -->
						<view class="uni-card__header-content">
							<text
								class="uni-card__header-content-title uni-ellipsis">{{ taskInfoProp.taskName + (taskInfoProp.taskStatus ? ` [${taskStatusText}]` :'' ) }}</text>
							<!-- <uni-tag size="mini" :inverted="true" :circle="true" type="primary"
								:text="taskInfoProp.taskStatus" /> -->
							<!-- <text v-if="title&&subTitle"
								class="uni-card__header-content-subtitle uni-ellipsis">{{ subTitle }}</text> -->
						</view>
					</view>
					<view class="uni-card__header-extra" @click="">
						<text class="uni-card__header-extra-text"> {{ ('优先级：'+ ( taskPriorityText || '')) }} </text>
					</view>
				</view>
			</template>

			<view class="card_title"
				v-if="taskFinishTime ||taskStartTime || taskInfoProp.taskDeadline || taskInfoProp.taskTag">
				<view v-if="taskInfoProp.taskTag">
					<uni-tag :text="taskInfoProp.taskTag.text" :type="taskInfoProp.taskTag.type"></uni-tag>
				</view>
				<view v-if="taskInfoProp.taskStartTime">
					{{taskStartTime+" 开始"}}
				</view>
				<view v-if="taskInfoProp.taskFinishTime">
					{{taskFinishTime+" 完成"}}
				</view>
				<view v-if="taskInfoProp.taskDeadline">
					{{taskInfoProp.taskDeadline+" 截止"}}
				</view>
			</view>

			<view class="uni-body" v-if="taskInfoProp.taskDescription">
				<text>
					{{taskInfoProp.taskDescription}}
				</text>
			</view>


			<!--<view slot="actions" class="card-actions">
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
						</view>-->
		</uni-card>



	</view>
</template>

<script>
	import { taskInfoUtil } from '@/utils/taskInfoUtil';
	export default {
		name: "taskInfoCard",
		props: {
			taskInfoProp: {
				type: Object,
				default: null
			}
		},
		methods: {

		},
		onLoad() {
			// this.taskInfo = this.taskInfoProp;
			// console.log(this.taskInfo);
		},
		mounted() {},
		options: { styleIsolation: 'shared' },
		computed: {
			cardColor() {
				return taskInfoUtil.taskStatusMap[this.taskInfoProp.taskStatus].color || '#ffd7d9';
			},
			taskStatusText() {
				return taskInfoUtil.taskStatusMap[this.taskInfoProp.taskStatus].text;
			},
			taskPriorityText() {
				return taskInfoUtil.getTaskPriorityText(this.taskInfoProp.taskPriority);
			},
			taskStartTime() {
				return this.taskInfoProp.taskStartTime;
			},
			taskFinishTime() {
				return this.taskInfoProp.taskFinishTime;
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
	@import "@/uni.scss";
	$uni-border-3: #EBEEF5 !default;
	$uni-shadow-base: 0 0px 6px 1px rgba($color: #a5a5a5, $alpha: 0.2) !default;
	$uni-main-color: #3a3a3a !default;
	$uni-base-color: #6a6a6a !default;
	$uni-secondary-color: #909399 !default;
	$uni-spacing-sm: 8px !default;
	$uni-border-color: $uni-border-3;
	$uni-shadow: $uni-shadow-base;
	$uni-card-title: 15px;
	$uni-card-title-color: $uni-main-color;
	$uni-card-subtitle: 12px;
	$uni-card-subtitle-color: $uni-secondary-color;
	$uni-card-spacing: 10px;
	$uni-card-content-color: $uni-base-color;


	:root {
		--card-color: #fff;
	}

	.card-container {
		margin: $uni-card-container-margin; // border-bottom: 1px solid $uni-border-color;
		// border-radius: $uni-border-radius-lg;

		/deep/ .uni-card {
			border-radius: $uni-border-radius-lg;
			background-color: var(--card-color);
		}


		.title-wrap {
			display: flex;
			justify-content: space-between;
		}





		.card_title {
			border-bottom: 1px $uni-border-color solid;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: baseline;
		}

		.uni-card__header {
			display: flex;
			border-bottom: 1px $uni-border-color solid;
			flex-direction: row;
			align-items: center;
			padding: $uni-card-spacing;
			overflow: hidden;

			.uni-card__header-box {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex: 1;
				flex-direction: row;
				align-items: center;
				overflow: hidden;
			}

			.uni-card__header-avatar {
				width: 40px;
				height: 40px;
				overflow: hidden;
				border-radius: 5px;
				margin-right: $uni-card-spacing;

				.uni-card__header-avatar-image {
					flex: 1;
					width: 40px;
					height: 40px;
				}
			}

			.uni-card__header-content {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: row;
				justify-content: left;
				flex: 1;
				// height: 40px;
				overflow: hidden;
				padding: 2upx;

				.uni-card__header-content-title {
					font-size: $uni-card-title;
					color: $uni-card-title-color;
					// line-height: 22px;
				}

				.uni-card__header-content-subtitle {
					font-size: $uni-card-subtitle;
					margin-top: 5px;
					color: $uni-card-subtitle-color;
				}
			}

			.uni-card__header-extra {
				line-height: 12px;

				.uni-card__header-extra-text {
					font-size: 12px;
					color: $uni-card-subtitle-color;
				}
			}
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

