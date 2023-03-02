import { reactive, ref } from 'vue'
export const progressBar = reactive({
    barWidth: '0%',
    isClicked: false,
    currentTime: '00:00',
    duration: '00:00',
    boundingRect: new DOMRect(),
    newTime: 0,
    updateProgressBar: () => {
        progressBar.barWidth =
            (audioElement.value.currentTime / audioElement.value.duration) * 100 + '%'
    },
    updateTime: (e) => {
        const x = progressBar.validateX(e.clientX)
        progressBar.newTime =
            (x / progressBar.boundingRect.width) * audioElement.value.duration
        progressBar.barWidth = (x / progressBar.boundingRect.width) * 100 + '%'
    },
    validateX: (x) => {
        // clientX is a property of the event object in JavaScript
        // progressBar.boundingRect.width = width of progress bar
        if (x < progressBar.boundingRect.left) {
            return 0
        } else if (x > progressBar.boundingRect.right) {
            return progressBar.boundingRect.width + 2
        } else {
            return x - progressBar.boundingRect.left
        }
    },
})

export const audioElement = ref(null)