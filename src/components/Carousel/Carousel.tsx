import { Button, ButtonLink } from '@components/Button';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import Slider from "react-slick";
import { UrlObject } from 'url';

type Props = {
  title: string;
  children: React.ReactNode;
  viewAll?: string | UrlObject;
};

export function Carousel({ title, children, viewAll }: Props) {
  const [arrowsReady, setArrowsReady] = useState<boolean>(false);
  const prevArrowRef = useRef<HTMLDivElement>(null);
  const nextArrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!arrowsReady && (prevArrowRef.current && nextArrowRef.current)) {
      setArrowsReady(true)
    }
  }, [prevArrowRef, nextArrowRef]);

  return (
    <div>
      <section className="flex justify-between items-center mb-6">
        <div className="flex justify-start items-center space-x-4">
          <h4 className="headline">{title}</h4>
          {viewAll && <ButtonLink href={viewAll} variant="link" size='noPadding'>View All</ButtonLink>}
        </div>

        <div className="flex gap-x-2">
          <div ref={prevArrowRef} />
          <div ref={nextArrowRef} />
        </div>
      </section>

      {arrowsReady && <Slider
        speed={500}
        slidesToScroll={1}
        slidesToShow={1}
        variableWidth
        infinite={false}
        prevArrow={
          <ArrowWrapper
            direction="prev"
            arrowRef={prevArrowRef.current as HTMLDivElement}
          />
        }
        nextArrow={
          <ArrowWrapper
            direction="next"
            arrowRef={nextArrowRef.current as HTMLDivElement}
          />
        }
      >
        {children}
      </Slider>}
    </div>
  )
}

type ArrowWrapperProps = {
  arrowRef: HTMLDivElement;
  direction: 'prev' | 'next';
  onClick?: () => void;
}

function ArrowWrapper({ arrowRef, direction, onClick }: ArrowWrapperProps) {
  return createPortal(
    <Arrow direction={direction} onClick={onClick ? onClick : () => { }} />,
    arrowRef
  )
}

type ArrowProps = {
  direction: 'prev' | 'next';
  onClick: () => void;
}

function Arrow({ direction, onClick }: ArrowProps) {
  return (
    <Button size="sm" variant="primary" onClick={onClick} icon={direction === 'prev' ? 'arrowLeftOutline' : 'arrowRightOutline'} />
  )
}