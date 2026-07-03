'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

import React, { ReactNode } from 'react';

interface ZoomParallaxProps {
	/** Array of React elements to be displayed in the parallax effect, max 7 items. The first item is the center element. */
	items: ReactNode[];
}

export function ZoomParallax({ items }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 5.5]);
	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scaleCenter, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden">
				{items.map((item, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center 
								${index === 1 ? '[&>div]:!-top-[25vh] [&>div]:!-left-[20vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} 
								${index === 2 ? '[&>div]:!-top-[22vh] [&>div]:!left-[22vw] [&>div]:!h-[22vh] [&>div]:!w-[18vw]' : ''} 
								${index === 3 ? '[&>div]:!top-[2vh] [&>div]:!-left-[32vw] [&>div]:!h-[20vh] [&>div]:!w-[16vw]' : ''} 
								${index === 4 ? '[&>div]:!top-[5vh] [&>div]:!left-[32vw] [&>div]:!h-[24vh] [&>div]:!w-[22vw]' : ''} 
								${index === 5 ? '[&>div]:!top-[26vh] [&>div]:!-left-[18vw] [&>div]:!h-[20vh] [&>div]:!w-[25vw]' : ''} 
								${index === 6 ? '[&>div]:!top-[28vh] [&>div]:!left-[18vw] [&>div]:!h-[18vh] [&>div]:!w-[20vw]' : ''} 
							`}
						>
							<div className="relative h-[28vh] w-[22vw] flex items-center justify-center">
								{item}
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
