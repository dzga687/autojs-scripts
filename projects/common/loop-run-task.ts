import { boundsClick } from './click-ele-bounds';
import { delayCheck } from './delay-check';
import { floatyDebug } from './floaty-debug';
import { getTaskCount, getTaskDelay } from './get-task-count';
import { scrollPage } from './scroll';

function loopRunTask({
  ele,
  name,
  checkIsInTask,
  getBtn = (o: UiObject) => {
    return o.findOne(textMatches(/去(完成|浏览)/));
  },
  runTask = (taskBtn, delay) => {
    boundsClick(taskBtn);
    sleep(3000);
    scrollPage();
    sleep(delay);
  },
  waitFinished = () => {
    delayCheck(5000, 1000, () => {
      return !!(
        descMatches(/.*任务.*完成.*/).findOnce() || textMatches(/.*任务.*完成.*/).findOnce()
      );
    });
  },
  checkBackToTask = (check) => {
    return delayCheck(
      5000,
      1000,
      () => {
        return check();
      },
      () => {
        back();
        sleep(1000);
      }
    );
  },
  lastResult = {
    total: 0,
    completed: 0,
    left: 0,
    retries: 0,
    max: 3,
  },
}: {
  ele?: UiObject | null;
  checkIsInTask: () => boolean;
  name?: string;
  getBtn?: (o: UiObject) => UiObject | undefined | null;
  runTask?: (taskBtn: UiObject, delay: number) => void;
  waitFinished?: () => void;
  checkBackToTask?: (checkIsInTask: () => boolean) => boolean;
  lastResult?: {
    total: number;
    completed: number;
    left: number;
    retries: number;
    max: number;
  };
}) {
  floatyDebug(ele);

  if (!ele) {
    console.warn(`no ${name} task found`);
    return;
  }

  toastLog(ele.text());

  const taskBtn = getBtn(ele);
  const taskCount = getTaskCount(ele);
  const delay = getTaskDelay(ele);

  if (!taskBtn) {
    toastLog(`⚠️警告: ${name} 任务失败, 未找到任务按钮`);
    return;
  }

  if (!taskCount) {
    toastLog(`⚠️警告: ${name} 任务失败, 未找到任务数据`);
    return;
  }

  if (taskCount.left === 0) {
    console.info(`${name} 任务完成, ${JSON.stringify(taskCount)}`);
    return;
  }

  if (lastResult.left === taskCount.left) {
    if (lastResult.retries > lastResult.max) {
      toastLog(`⚠️警告: ${name} 任务失败, 重试过多`);
      return;
    }
  } else {
    // eslint-disable-next-line no-param-reassign
    lastResult.retries = 0;
  }

  console.info({
    taskCount,
    delay,
    retries: lastResult.retries,
  });

  runTask(taskBtn, delay);

  waitFinished();

  const isInTask = checkBackToTask(checkIsInTask);

  if (!isInTask) {
    throw new Error('不在任务面板');
  }

  loopRunTask({
    ele,
    name,
    checkIsInTask,
    getBtn,
    runTask,
    waitFinished,
    checkBackToTask,
    lastResult: {
      ...taskCount,
      retries: lastResult.retries + 1,
      max: lastResult.max,
    },
  });
}

export { loopRunTask };
