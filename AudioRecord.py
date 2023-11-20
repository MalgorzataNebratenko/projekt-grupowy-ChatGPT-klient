import sounddevice as sd
import wavio
import datetime
import os
from pydub import AudioSegment


class AudioRecord:
    audio = None

    def set_speaking_volume(self, path_to_filename, speaking_volume):  # speaking_volume in dB
        self.audio = AudioSegment.from_wav(path_to_filename)
        self.audio += speaking_volume
        self.audio.export(path_to_filename, "wav")

    def record(self, speaking_volume):
        sample_rate = 44100  # rate in Hz; samples(chunk) per second
        recording_duration = 5
        while True:
            current_time = datetime.datetime.now()
            filename = current_time.strftime("%Y-%m-%d %H-%M-%S")
            recording = sd.rec(frames=int(sample_rate * recording_duration), samplerate=sample_rate, channels=2,
                               dtype='int16')
            sd.wait()
            if not os.path.exists("recordings"):
                os.makedirs("recordings")
            wavio.write(f"recordings/{filename}.wav", recording, sample_rate, sampwidth=2)

            self.set_speaking_volume(f"recordings/{filename}.wav", speaking_volume)


# record_audio = AudioRecord()
# record_audio.record(40)
