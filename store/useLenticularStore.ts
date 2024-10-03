import { create } from "zustand";
import axios from "axios";

// const API_URL = "https://lenticular-api.gokapturehub.com";
const API_URL = "http://localhost:8081";

type LenticularState = {
  images: File[];
  result: string | null;
  loading: boolean;
};

type LenticularActions = {
  addImages: (images: File[]) => void;
  removeImage: (idx: number) => void;
  generate: () => Promise<void>;
  downloadResult: () => void;
};

const useLenticularStore = create<LenticularState & LenticularActions>(
  (set) => ({
    images: [],
    result: null,
    loading: false,
    addImages: (images: File[]) => {
      set({ images });
    },
    removeImage: (idx: number) => {
      const prevImages = useLenticularStore.getState().images;
      const newImages = prevImages.filter((_, i) => {
        console.log(i, idx);
        return i !== idx;
      });
      set({ images: newImages });
    },
    generate: async () => {
      try {
        set({ loading: true });
        const images = useLenticularStore.getState().images;
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("images", image);
        });
        // formData.append("stripWidth", "1");

        const { data } = await axios.post(`${API_URL}/upload`, formData, {
          responseType: "blob",
        });

        const imageUrl = URL.createObjectURL(data);
        set({ result: imageUrl, images: [], loading: false });
      } catch (error: any) {
        console.error(error.response);
        set({ loading: false });
      }
    },
    downloadResult: () => {
      const { result } = useLenticularStore.getState();
      if (result) {
        const a = document.createElement("a");
        a.href = result;
        a.download = "generated-image.png";
        a.click();
      }
    },
  })
);

export { useLenticularStore };
