"use client";

// import Image from "next/image";
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import Link from "next/link";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import styles from "./page.module.css";

import { ToastState, FormData, FormErrors } from "@/interface";
import Toast from "@/components/Toast";
import { mockLoginApi } from "@/mockApi";

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const validateEmail = useCallback((email: string): string | undefined => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  }, []);

  const validatePassword = useCallback(
    (password: string): string | undefined => {
      if (!password.trim()) {
        return "Password is required";
      }
      if (password.length < 8) {
        return "Password must be at least 8 characters";
      }
      return undefined;
    },
    []
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      if (name === "email") {
        const emailError = validateEmail(value);
        setErrors((prev) => ({
          ...prev,
          email: emailError,
        }));
      } else if (name === "password") {
        const passwordError = validatePassword(value);
        setErrors((prev) => ({
          ...prev,
          password: passwordError,
        }));
      }
    },
    [validateEmail, validatePassword]
  );

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type, isVisible: true });
      setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
      }, 5000);
    },
    []
  );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.email);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await mockLoginApi(formData);

      console.log(response)

      if (response.success) {
        showToast("Successfully signed in! Redirecting...", "success");

        setTimeout(() => {
          setFormData({ email: "", password: "", remember: false });
          showToast("This is just a demo. Form was reset.", "success");
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      showToast(errorMessage, "error");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h2 className={styles.h2}>Welcome Back, Evil Martians!</h2>
          <p className={styles.p}>
            We are excited to have you back. Log in now and access your account
          </p>
        </header>
        <form className={styles.form}>
          <div className={styles.formBody}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="evilmartians@gmail.com"
                autoComplete="email"
                required
                aria-required={true}
                aria-describedby="email-error"
                className={styles.input}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div id="email-error" className={styles.formError} role="alert">
                  {errors.email}
                </div>
              )}
            </div>
            <div className={styles.formGroup} style={{ position: "relative" }}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="*******"
                autoComplete="password"
                required
                aria-required={true}
                aria-describedby="email-error"
                className={styles.input}
                onChange={handleInputChange}
              />
              {/* <div id="password-error" className="password" role="alert"></div> */}
              <button
                className={styles.visibilityButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEye color="#fff" size={20} />
                ) : (
                  <FaRegEyeSlash color="#fff" size={20} />
                )}
              </button>
              {errors.password && (
                <div
                  id="password-error"
                  className={styles.formError}
                  role="alert"
                >
                  {errors.password}
                </div>
              )}
            </div>
            <div className={styles.rememberContainer}>
              <div className={styles.remember}>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  onChange={handleInputChange}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              {/* <div className=""> */}
              <Link href="/forgot_password" className={styles.forgot}>
                Forgot your password?
              </Link>
              {/* </div> */}
            </div>
          </div>
          <button
            className={styles.login}
            type="submit"
            onSubmit={handleSubmit}
          >
            {isLoading && <div className={styles.spinner} />}
            <span>{isLoading ? "Signing in..." : "Sign in"}</span>
          </button>
        </form>
      </main>
      <div className={styles.blob}></div>
      <Toast {...toast} />
    </div>
  );
}
