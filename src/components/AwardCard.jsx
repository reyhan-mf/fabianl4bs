import { Icon, Illustration } from './Icon.jsx';

export default function AwardCard({ award, onViewCertificate, as: Tag = 'h3' }) {
  const { title, issuer, date, description, certificate, badge } = award;

  return (
    <article className="fl-award">
      <div className="fl-award__top">
        <Illustration name={badge} size="md" />
        <span className="fl-award__date">{date}</span>
      </div>

      <Tag className="fl-award__title">{title}</Tag>
      <p className="fl-award__issuer">{issuer}</p>
      {description && <p className="fl-award__desc">{description}</p>}

      {certificate && (
        <div className="fl-award__foot">
          <button type="button" className="fl-link fl-link--plain" onClick={() => onViewCertificate(award)}>
            View certificate
            <Icon name="image" />
          </button>
        </div>
      )}
    </article>
  );
}
