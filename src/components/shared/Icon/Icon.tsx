import svgSprite from 'assets/icons/icons-sprite.svg';

interface IconProps {
  className?: string;
  iconName: string;
}

const Icon = ({ className = 'abc', iconName }: IconProps): JSX.Element => (
  <svg className={className}>
    <use xlinkHref={`${svgSprite}#${iconName}`} href={`${svgSprite}#${iconName}`} />
  </svg>
);

Icon.defaultProps = {
  className: null,
};

export default Icon;
