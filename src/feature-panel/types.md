// FeaturePanel 类型定义

/**
 * Item 对象接口
 */
export interface Item {
  id: string | number;
  title: string;
  description?: string;
  status: 'active' | 'disabled';
}

/**
 * 配置对象接口
 */
export interface FeaturePanelConfig {
  items: Array<Item>;
  onSelect: (item: Item) => void;
  className?: string;
  style?: React.CSSProperties | object;
}

/**
 * FeaturePanel 状态类型
 */
export type FeaturePanelStatus = 
  | 'loading'    // 数据加载中
  | 'error'      // 加载失败或发生错误
  | 'empty'      // 数据加载成功但为空
  | 'normal';    // 正常显示状态

/**
 * FeaturePanel 核心类接口
 */
export interface FeaturePanel {
  /**
   * 渲染到指定容器
   * @param container - 目标容器元素
   */
  render(container: HTMLElement): void;

  /**
   * 更新数据项
   * @param items - 新的数据项数组
   */
  updateItems(items: Array<Item>): void;

  /**
   * 设置组件状态
   * @param status - 要设置的状态
   */
  setStatus(status: FeaturePanelStatus): void;

  /**
   * 清理资源，销毁组件
   */
  destroy(): void;
}

/**
 * 状态机配置
 */
export interface StateMachineConfig {
  current: FeaturePanelStatus;
  transitions: {
    [K in FeaturePanelStatus]?: FeaturePanelStatus[];
  };
}
