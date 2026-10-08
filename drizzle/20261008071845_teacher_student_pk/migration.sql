DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.teacher_student'::regclass
      AND contype = 'p'
  ) THEN
    ALTER TABLE "teacher_student" ADD PRIMARY KEY ("teacher_id", "student_id");
  END IF;
END $$;