import svgSprite from 'assets/icons/icons-sprite.svg';

type Props = {
  className?: string;
  iconName: string;
};

const Icon = ({ className, iconName }: Props): JSX.Element => (
  <svg className={className}>
    <use xlinkHref={`${svgSprite}#${iconName}`} href={`${svgSprite}#${iconName}`} />
  </svg>
);

Icon.defaultProps = {
  className: null,
};

export default Icon;
