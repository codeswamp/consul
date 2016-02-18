class MakeProposalTitlesEvenLonger < ActiveRecord::Migration
  def up
    change_column :proposals, :title, :string, :limit => 250
  end
  def down
    change_column :proposals, :title, :string, :limit => 160
  end
end
