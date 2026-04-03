"use client";

import { signUp } from "@/actions/auth-actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("비밀버호가 일치하지 않습니다.");
      return;
    }

    const result = await signUp({ email, password });

    if (result?.status === "ok") {
      redirect("/sign-in");
    }
    if (result?.message) {
      alert(result.message);
    }
  }

  return (
    <div className="flex flex-col gap-7 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">회원가입</h1>
      <p className="text-gray-700">인프런에서 다양한 학습의 기회를 얻으세요</p>
      <form
        className="flex flex-col gap-5 min-w-[300px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="email">이메일</label>
          <input
            className="border border-gray-300 rounded-sm px-4 py-2"
            type="email"
            name="email"
            placeholder="example@inflear.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">비밀번호</label>
          <input
            className="border border-gray-300 rounded-sm px-4 py-2"
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            className="border border-gray-300 rounded-sm px-4 py-2"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 재입력해주세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <button className="bg-green-500 text-white font-bold rounded-sm px-3 py-2 flex items-center justify-center cursor-pointer">
            회원가입{" "}
          </button>
          <Link
            href={"/sign-in"}
            className="rounded-sm px-3 py-2 flex items-center justify-center cursor-pointer"
          >
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
