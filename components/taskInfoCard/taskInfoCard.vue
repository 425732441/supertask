<template>
	<view class="card-container">

		<uni-card is-full :style="'--card-color:'+cardColor" :title="taskInfoProp.taskName"
			:extra="('优先级：'+taskInfoProp.taskPriority)">
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
					<view class="uni-card__header-extra" @click="onClick('extra')">
						<text class="uni-card__header-extra-text">{{ ('优先级：'+taskInfoProp.taskPriority) || '' }}</text>
					</view>
				</view>
			</template>

			<view class="card_title">
				<view v-if="taskInfoProp.taskTag">
					<uni-tag :text="taskInfoProp.taskTag.text" :type="taskInfoProp.taskTag.type"></uni-tag>
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
	let taskStatusMap = {
		notstart: { color: '#ffd7d9', text: '未开始' },
		inprogress: { color: '#fff1a6', text: '进行中' },
		finished: { color: '#c7ffae', text: '已完成' }
	}
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
				return taskStatusMap[this.taskInfoProp.taskStatus].color || '#ffd7d9';
			},
			taskStatusText() {
				return taskStatusMap[this.taskInfoProp.taskStatus].text;
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
	$uni-border-3: #EBEEF5 !default;
	$uni-shadow-base: 0 0px 6px 1px rgba($color: #a5a5a5, $alpha: 0.2) !default;
	$uni-main-color: #3a3a3a !default;
	$uni-base-color: #6a6a6a !default;
	$uni-secondary-color: #909399 !default;
	$uni-spacing-sm: 8px !default;
	$uni-border-color: $uni-border-3;
	$uni-shadow: $uni-shadow-base;
	$uni-card-title: 15px;
	$uni-cart-title-color: $uni-main-color;
	$uni-card-subtitle: 12px;
	$uni-cart-subtitle-color: $uni-secondary-color;
	$uni-card-spacing: 10px;
	$uni-card-content-color: $uni-base-color;

	:root {
		--card-color: #fff;
	}

	.card-container {
		margin: 10upx 1upx;
		// border-bottom: 1px solid $uni-border-color;
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
			display: flex;
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
					color: $uni-cart-title-color;
					// line-height: 22px;
				}

				.uni-card__header-content-subtitle {
					font-size: $uni-card-subtitle;
					margin-top: 5px;
					color: $uni-cart-subtitle-color;
				}
			}

			.uni-card__header-extra {
				line-height: 12px;

				.uni-card__header-extra-text {
					font-size: 12px;
					color: $uni-cart-subtitle-color;
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

