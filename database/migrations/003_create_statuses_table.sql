CREATE TABLE statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    -- Ensure unique status names per project
    CONSTRAINT unique_status_name_per_project UNIQUE (project_id, name),
    -- Ensure unique sort order per project
    CONSTRAINT unique_sort_order_per_project UNIQUE (project_id, sort_order)
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_statuses_updated_at
BEFORE UPDATE ON statuses
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();