<template>
	<view class="container">
		<z-no-data v-if="projects.length <=0" imgUrl="/static/images/toast/img_nodata.png">暂无数据</z-no-data>
		<uni-swipe-action>
			<uni-swipe-action-item :right-options="actions" @click="handlerButton($event,item)"
				v-for="(item,index) in projects" :key="index" :auto-close="true">
				<view class="tui-list-item" @click="showProjectInfo(item.name)">
					<image :src="(item.imagePath || '/static/images/basic/layout.png')" class="item-img"></image>
					<view class="item-box">
						<view class="item-title">{{item.name}}</view>
						<view class="item-time">{{ item.createTime }}</view>
					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<uni-fab horizontal="right" @fabClick="clickFab"></uni-fab>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				actions: [{
						text: '删除',
						style: {
							color: '#fff',
							fontsize: 30, //单位rpx
							backgroundColor: '#FD3B31'
						}
					},
					{
						text: '修改',
						style: {
							fontsize: 30,
							color: '#fff',
							backgroundColor: '#C8C7CD'
						}
					}
				],
				projects: [],
				title: 'Hello'
			}
		},
		onReady() {},
		onShow() {
			this.projects = this.getProjects() || [];

		},
		onLoad() {

		},
		methods: {
			...mapGetters(['getProjects']),
			...mapMutations(['setProjects']),
			showProjectInfo(name) {
				uni.navigateTo({
					url: '/pages/projectInfo/projectInfo?name=' + name,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			handlerButton(e, item) {
				console.log(e);
				let index = e.index;
				let menuTxt = ["删除", "修改", "收藏"][index];
				if (index === 0) {
					// delete
					this.deleteProject(item);
					uni.showToast({
						title: `${menuTxt}成功`,
					});
				}
			},
			deleteProject(item) {
				const i = this.projects.findIndex(i => i.name === item.name);
				this.projects.splice(i, 1);
				this.setProjects(this.projects)
			},
			clickFab(index) {
				// this.projects.push({id:11});
				uni.navigateTo({
					url: '/pages/addProject/addProject',
					success: res => {
						// console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
				// console.log(index);
			}

		}
	}

</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.container {
		background: #fff;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-list-item {
		padding: 30rpx 30rpx;
		display: flex;
		align-items: item;
	}

	.item-img {
		height: 120rpx;
		width: 120rpx;
		margin-right: 20rpx;
		display: block
	}

	.item-box {
		flex: 1;
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: space-between
	}

	.item-title {
		font-size: 32rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.item-time {
		color: #999;
		font-size: 24rpx;
	}

</style>

