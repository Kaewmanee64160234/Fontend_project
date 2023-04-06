import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Swal from 'sweetalert2';

export enum DialogType {
  info,
  error,
  confirm,
}
export const useMessageStore = defineStore("message", () => {
  const isShow = ref(false);
  const message = ref("");
  const type = ref<DialogType>(DialogType.info);

  function showError(text: string) {
    Swal.fire({
      iconHtml: '<span class="mdi mdi-bell-alert-outline mdi-48px"></span>',
      background: "white",
      confirmButtonText: "Close",
      text: text,
    });
  }

  function showInfo(text: string) {
    type.value = DialogType.info;
    message.value = text;
    isShow.value = true;
  }
  function showConfirm(text: string) {
    type.value = DialogType.confirm;
    message.value = text;
    isShow.value = true;
  }
  return { isShow, message, showError, showInfo };
});
