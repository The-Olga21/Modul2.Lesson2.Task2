import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	let [steps, setSteps] = useState(data);
	let [activeIndex, setActiveIndex] = useState(0);

	let isFirstStep;
	if (activeIndex === 0) {
		isFirstStep = true;
	} else {
		isFirstStep = false;
	}

	let isLastStep;
	if (activeIndex === data.length - 1) {
		isLastStep = true;
	} else {
		isLastStep = false;
	}

	const onBackButtonClick = () => {
		setActiveIndex(activeIndex - 1);
	};

	const onForwardButtonClick = () => {
		if (isLastStep) {
			setActiveIndex(0);
		} else {
			setActiveIndex(activeIndex + 1);
		}
	};

	const onClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{data.map(({ id, title, content }, index) => (
							<li
								className={
									activeIndex > index
										? styles['steps-item'] + ' ' + styles.done
										: styles['steps-item'] && activeIndex === index
											? styles['steps-item'] +
												' ' +
												styles.done +
												' ' +
												styles.active
											: styles['steps-item']
								}
								key={id}
							>
								<button
									className={styles['steps-item-button']}
									onClick={(e) => onClick(index)}
								>
									{index + 1}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onBackButtonClick}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button className={styles.button} onClick={onForwardButtonClick}>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
