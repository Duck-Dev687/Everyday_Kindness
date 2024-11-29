import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import dayjs from "dayjs";

export const updateStreak = async (userId: string): Promise<number> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    const today = dayjs().format("YYYY-MM-DD");

    if (userSnap.exists()) {
      const userData = userSnap.data();

      // Ensure streakCount and lastLoginDate exist
      const lastLoginDate = userData?.lastLoginDate || null;
      const streakCount = userData?.streakCount || 0;

      if (lastLoginDate && dayjs(today).isSame(lastLoginDate, "day")) {
        // Same day login, no update needed
        return streakCount;
      } else if (lastLoginDate && dayjs(today).diff(lastLoginDate, "day") === 1) {
        // Increment streak (next-day login)
        const newStreak = streakCount + 1;
        await updateDoc(userRef, { streakCount: newStreak, lastLoginDate: today });
        return newStreak;
      } else {
        // Streak reset (missed one or more days)
        await updateDoc(userRef, { streakCount: 1, lastLoginDate: today });
        return 1;
      }
    } else {
      // Create a new user entry if it doesn't exist
      await setDoc(userRef, { streakCount: 1, lastLoginDate: today });
      return 1;
    }
  } catch (error) {
    console.error("Error updating streak:", error);
    throw new Error("Failed to update streak.");
  }
};
