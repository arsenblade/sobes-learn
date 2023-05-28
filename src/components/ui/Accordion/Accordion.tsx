import * as React from 'react';
import {
  ReactNode, useCallback, useRef, useState,
} from 'react';
import classNames from 'classnames';
import styles from './Accordion.module.scss';

interface AccordionProps {
    title: string,
    children: ReactNode,
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const getHeight = () => {
    if (contentRef.current && accordionRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      const accordionHeight = accordionRef.current.offsetHeight;
      const contentMarginTopValue = Number(window.getComputedStyle(contentRef.current, null).getPropertyValue('margin-top').slice(0, -2));
      return contentHeight + accordionHeight + contentMarginTopValue;
    }

    return accordionRef.current?.offsetHeight;
  };

  const handleToggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <div className={styles.accordion} onClick={handleToggle} style={isOpen ? { height: getHeight() } : {}} ref={accordionRef}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={classNames(styles.icon, { [styles.iconOpen]: isOpen })}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5674 6.43718C22.2697 6.13951 21.786 6.13951 21.4883 6.43718L12 15.9442L2.493 6.43718C2.19532 6.13951 1.7116 6.13951 1.41393 6.43718C1.11626 6.73486 1.11626 7.21858 1.41393 7.51625L11.4418 17.5442C11.5907 17.693 11.7767 17.7674 11.9814 17.7674C12.1674 17.7674 12.3721 17.693 12.5209 17.5442L22.5488 7.51625C22.8651 7.21858 22.8651 6.73486 22.5674 6.43718Z" />
          </svg>
        </span>
      </div>
      <div className={styles.content} ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
