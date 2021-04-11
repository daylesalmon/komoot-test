import svgSprite from 'assets/icons/icons-sprite.svg';

type IconProps = {
  className?: string;
  iconName: string;
} & typeof defaultProps;

const defaultProps = {
  className: '',
};

const Icon = ({ className, iconName }: IconProps): JSX.Element => (
  <svg className={className}>
    <use xlinkHref={`${svgSprite}#${iconName}`} href={`${svgSprite}#${iconName}`} />
  </svg>
);

Icon.defaultProps = defaultProps;

export default Icon;
