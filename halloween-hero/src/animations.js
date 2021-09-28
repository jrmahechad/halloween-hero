import { gsap, Power2 } from "gsap";
let candyIsAnimating = false;
let bookIsAnimating = false;
let bookRotationLeft = true;

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

function getBookIsAnimating() {
  return bookIsAnimating;
}

export {
  getBookIsAnimating,
  getCandyIsAnimating,
  gsapBookAnimation,
  gsapCandyAnimation,
};
