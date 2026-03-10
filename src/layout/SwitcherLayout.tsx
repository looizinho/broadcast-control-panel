import AudioMeter from '../components/AudioMeter';
import Button from '../components/Button';
import Knob from '../components/Knob';
import LedIndicator from '../components/LedIndicator';
import Slider from '../components/Slider';
import styles from './SwitcherLayout.module.css';

export default function SwitcherLayout() {
  return (
    <main className={styles.panel}>
      <section className={styles.metersLeft}>
        <AudioMeter label="Mic" level={74} />
        <AudioMeter label="Aux" level={59} />
      </section>

      <section className={styles.controls}>
        <header className={styles.ledRow}>
          <LedIndicator label="PGM" color="red" />
          <LedIndicator label="PVW" color="green" />
          <LedIndicator label="SYNC" color="yellow" on={false} />
        </header>

        <div className={styles.buttonMatrix}>
          <Button label="CAM 1" variant="program" active />
          <Button label="CAM 2" variant="program" />
          <Button label="CAM 3" variant="preview" />
          <Button label="MEDIA" variant="preview" />
          <Button label="KEY 1" />
          <Button label="KEY 2" />
        </div>

        <div className={styles.sliderRow}>
          <Slider label="Transition" value={48} />
          <Slider label="Fade Time" value={72} />
        </div>
      </section>

      <section className={styles.knobArea}>
        <Knob label="Menu" value={31} />
        <Knob label="Trim" value={59} />
      </section>

      <section className={styles.metersRight}>
        <AudioMeter label="PGM" level={81} />
        <AudioMeter label="PVW" level={66} />
      </section>
    </main>
  );
}
