import { create } from 'zustand';

const useStore = create((set) => ({
  selectedCourse: null,
  setSelectedCourse: (course) => set({ selectedCourse: course }),
}));

export default useStore;
