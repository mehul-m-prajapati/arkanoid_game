import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
// Images
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
// Level and colors
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_STARTX,
    BALL_STARTY,
	BALL_SIZE
} from "./setup";

import { createBricks } from './helpers';

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over !!!!');
    gameOver = false;
}

function setGameWin(view: CanvasView) {
    view.drawInfo('Game Won :)');
    gameOver = false;
}

function gameLoop(
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball
) {
    view.clear();
    view.drawBricks(bricks);
	view.drawSprite(paddle);
	view.drawSprite(ball);

	ball.moveBall();

	// Move paddle and check so it won't exit play field
	if (
		(paddle.isMovingLeft && paddle.pos.x > 0) ||
		(paddle.isMovingRight && paddle.pos.x < view.canvas.width - PADDLE_WIDTH)
	) {
		paddle.movePaddle();
	}

    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball));
}

// Start the main game
function startGame(view: CanvasView) {

    // Reset the display
    score = 0;
    view.drawInfo('');
    view.drawScore(0);

    // Create bricks
    const bricks = createBricks();
	// Create ball
	const ball = new Ball(
		BALL_SPEED,
		BALL_SIZE,
		{
			x: BALL_STARTX,
			y: BALL_STARTY
		},
		BALL_IMAGE
	)
	// Create paddle
	const paddle = new Paddle(
		PADDLE_SPEED,
		PADDLE_WIDTH,
		PADDLE_HEIGHT,
		{
			x: PADDLE_STARTX,
			y: view.canvas.height - PADDLE_HEIGHT - 5
		},
		PADDLE_IMAGE,
	)

    gameLoop(view, bricks, paddle, ball);
}

const view = new CanvasView('#playfield');
view.initStartButton(startGame);
