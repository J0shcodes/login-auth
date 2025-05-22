"use client"

// import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

export default function Home() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
              />
              <div id="email-error" className="error" role="alert"></div>
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
              />
              <div id="password-error" className="password" role="alert"></div>
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
            </div>
            <div className={styles.rememberContainer}>
              <div className={styles.remember}>
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div>
                <Link href="/forgot_password">Forgot your password?</Link>
              </div>
            </div>
          </div>
          <button className={styles.login} type="submit">Log In</button>
        </form>
      </main>
      <div className={styles.blob}></div>
      <div id="toast" className="toast" role="alert" aria-live="assertive">toast</div>
    </div>
  );
}
