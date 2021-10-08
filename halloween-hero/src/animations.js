import { gsap, Power2 } from "gsap";
let candyIsAnimating = false;
let jackOLanternIsAnimating = false;
let bookIsAnimating = false;
let bookRotationLeft = true;

function gsapJackOLanternAnimation(jackOLantern) {
  jackOLanternIsAnimating = true;
  const animationValues = {
    durations: { start: 0, step1: 1 / 10, step2: 1 / 10 },
    initialPosition: {
      x: jackOLantern.position.x,
      y: jackOLantern.position.y,
      z: jackOLantern.position.z,
    },
    initialRotation: {
      x: jackOLantern.rotation.x,
      y: jackOLantern.rotation.y,
      z: jackOLantern.rotation.z,
    },
  };
  const mainTimeline = gsap.timeline();
  const bagTimeline = gsap.timeline();
  bagTimeline.add("start", animationValues.durations.start);
  bagTimeline.to(
    jackOLantern.rotation,
    {
      z: animationValues.initialRotation.z + Math.PI * 0.025,
      duration: animationValues.durations.step1,
    },
    "start"
  );
  bagTimeline.to(jackOLantern.rotation, {
    z: animationValues.initialRotation.z - Math.PI * 0.025,
    duration: animationValues.durations.step1,
  });
  bagTimeline.to(
    jackOLantern.rotation,
    {
      x: animationValues.initialRotation.x + Math.PI * 0.025,
      duration: animationValues.durations.step2,
    },
    "start"
  );
  bagTimeline.to(jackOLantern.rotation, {
    x: animationValues.initialRotation.x - Math.PI * 0.025,
    duration: animationValues.durations.step2,
  });
  bagTimeline.repeat(2);
  mainTimeline.add(bagTimeline, 0);
  mainTimeline.to(jackOLantern.rotation, {
    z: animationValues.initialRotation.z,
    duration: animationValues.durations.step1,
  });
  mainTimeline.to(jackOLantern.rotation, {
    x: animationValues.initialRotation.x,
    duration: animationValues.durations.step1,
  });
  mainTimeline.call(() => {
    jackOLanternIsAnimating = false;
  });
}

function gsapCandyAnimation(candy) {
  candyIsAnimating = true;
  const animationValues = {
    durations: { start: 0, step1: 1 / 4, step2: 1 / 4 },
    initialPosition: {
      x: candy.position.x,
      y: candy.position.y,
      z: candy.position.z,
    },
    initialRotation: {
      x: candy.rotation.x,
      y: candy.rotation.y,
      z: candy.rotation.z,
    },
  };

  const timeline = gsap.timeline();
  timeline.add("start", animationValues.durations.start);
  timeline.to(candy.position, {
    y: 1.5,
    duration: animationValues.durations.step1,
    ease: Power2.easeOut,
  });
  timeline.add("down");
  timeline.to(candy.position, {
    y: animationValues.initialPosition.y,
    duration: animationValues.durations.step2,
    ease: Power2.easeIn,
  });
  timeline.to(
    candy.rotation,
    {
      z: animationValues.initialRotation.z + Math.PI * 2.5,
      duration: animationValues.durations.step1,
    },
    "start"
  );
  timeline.to(
    candy.rotation,
    {
      z: animationValues.initialRotation.z + Math.PI * 3.5,
      duration: animationValues.durations.step2,
    },
    "down"
  );
  timeline.call(() => {
    candyIsAnimating = false;
  });
}

function gsapBookAnimation(book) {
  bookIsAnimating = true;
  const animationValues = {
    durations: { start: 0, step1: 1, step2: 1 / 4 },
    initialPosition: {
      x: book.position.x,
      y: book.position.y,
      z: book.position.z,
    },
    initialRotation: {
      x: book.rotation.x,
      y: book.rotation.y,
      z: book.rotation.z,
    },
  };
  const timeline = gsap.timeline();
  timeline.add("start", animationValues.durations.start);
  timeline.to(
    book.rotation,
    {
      y: bookRotationLeft
        ? animationValues.initialRotation.z + Math.PI * 0.76
        : animationValues.initialRotation.z + Math.PI * 0.25,
      duration: animationValues.durations.step1,
    },
    "down"
  );
  timeline.call(() => {
    bookIsAnimating = false;
    bookRotationLeft = !bookRotationLeft;
  });
}

function getCandyIsAnimating() {
  return candyIsAnimating;
}

function getJackOLanternIsAnimating() {
  return jackOLanternIsAnimating;
}

function getBookIsAnimating() {
  return bookIsAnimating;
}

export {
  getBookIsAnimating,
  getCandyIsAnimating,
  gsapBookAnimation,
  gsapCandyAnimation,
  gsapJackOLanternAnimation,
  getJackOLanternIsAnimating,
};
