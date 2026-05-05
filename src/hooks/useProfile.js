import { useState, useEffect, useCallback } from "react";
import { authService } from "../core/services/auth.service";
import { toast } from "react-toastify";

/**
 * useProfile — fetches the current user's profile and exposes an updateProfile fn.
 *
 * Returns:
 *   profile   — the profile object (or null while loading)
 *   loading   — true during initial fetch
 *   error     — error message string (or null)
 *   updating  — true while a save is in progress
 *   updateProfile(data) — async fn; returns true on success, false on failure
 */
export const useProfile = () => {
  const [profile, setProfile]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [updating, setUpdating] = useState(false);

  /* ── fetch on mount ── */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await authService.getProfile();
        // backend may wrap in data.data or data
        const data = res?.data?.data ?? res?.data ?? null;
        setProfile(data);
      } catch (err) {
        const msg = err?.response?.data?.message ?? "Failed to load profile";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ── update ── */
  const updateProfile = useCallback(async (formData) => {
    setUpdating(true);
    try {
      const res = await authService.updateProfile(formData);
      const updated = res?.data?.data ?? res?.data ?? null;
      if (updated) setProfile(updated);
      toast.success("Profile updated successfully");
      return true;
    } catch (err) {
      const msg = err?.response?.data?.message ?? "Failed to update profile";
      toast.error(msg);
      return false;
    } finally {
      setUpdating(false);
    }
  }, []);

  return { profile, loading, error, updating, updateProfile };
};
