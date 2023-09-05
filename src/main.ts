import './style.css';

const synth = window.speechSynthesis;

const form = document.querySelector('form') as HTMLFormElement;
const textInput = document.querySelector('#text') as HTMLInputElement;
const rateInput = document.querySelector('#rate') as HTMLInputElement;
const pitchInput = document.querySelector('#pitch') as HTMLInputElement;
const voiceSelect = document.querySelector('#voice') as HTMLSelectElement;

let voices: SpeechSynthesisVoice[] = [];

function getVoices() {
  voices = synth.getVoices().sort((a, b) => a.name.localeCompare(b.name));
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute('value', `${voice.name} (${voice.lang})`);
    voiceSelect.appendChild(option);
  });
}

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

function speak() {
  if (synth.speaking) {
    synth.cancel();
  }
  if (textInput.value !== '' && voiceSelect.value !== '') {
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('value');
    voices.forEach(voice => {
      if (`${voice.name} (${voice.lang})` === selectedVoice) {
        speakText.voice = voice;
      }
    });
    speakText.rate = Number(rateInput.value);
    speakText.pitch = Number(pitchInput.value);
    synth.speak(speakText);
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  speak();
});
