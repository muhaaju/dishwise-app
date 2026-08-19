-- Create customers table for storing user profile data
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  default_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(auth_user_id)
);

-- Create index on auth_user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_customers_auth_user_id ON customers(auth_user_id);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view only their own customer data
CREATE POLICY "Users can view own customer data"
ON customers
FOR SELECT
USING (auth.uid() = auth_user_id);

-- Policy: Users can insert their own customer data
CREATE POLICY "Users can insert own customer data"
ON customers
FOR INSERT
WITH CHECK (auth.uid() = auth_user_id);

-- Policy: Users can update only their own customer data
CREATE POLICY "Users can update own customer data"
ON customers
FOR UPDATE
USING (auth.uid() = auth_user_id);

-- Policy: Users can delete their own customer data
CREATE POLICY "Users can delete own customer data"
ON customers
FOR DELETE
USING (auth.uid() = auth_user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_customers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before update
CREATE TRIGGER trigger_update_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_customers_updated_at();

-- Create function to automatically create customer profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.customers (auth_user_id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function after user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();
